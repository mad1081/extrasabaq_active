import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    // Base query
    let baseQuery = supabase.from("competitions").select("category, subject, level, format").eq("status", "active")

    if (category) {
      baseQuery = baseQuery.eq("category", category)
    }

    const { data, error } = await baseQuery

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Extract unique values
    const categories = [...new Set(data?.map((item) => item.category) || [])]
    const subjects = [...new Set(data?.map((item) => item.subject) || [])]
    const levels = [...new Set(data?.map((item) => item.level) || [])]
    const formats = [...new Set(data?.map((item) => item.format) || [])]

    // Get counts for each category
    const categoryCountMap = data?.reduce((acc: any, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1
      return acc
    }, {})

    return NextResponse.json({
      filters: {
        categories: categories.map((cat) => ({
          value: cat,
          label: cat,
          count: categoryCountMap?.[cat] || 0,
        })),
        subjects: subjects.map((subj) => ({
          value: subj,
          label: subj,
        })),
        levels: levels.map((level) => ({
          value: level,
          label:
            {
              international: "Международный",
              national: "Республиканский",
              regional: "Региональный",
              local: "Местный",
            }[level] || level,
        })),
        formats: formats.map((format) => ({
          value: format,
          label:
            {
              online: "Онлайн",
              offline: "Очно",
              hybrid: "Гибридный",
            }[format] || format,
        })),
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
