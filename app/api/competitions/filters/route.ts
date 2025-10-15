import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Get unique categories
    const { data: categories } = await supabase
      .from("competitions")
      .select("category")
      .eq("status", "active")

    // Get unique subjects
    const { data: subjects } = await supabase
      .from("competitions")
      .select("subject")
      .eq("status", "active")

    // Get unique levels
    const { data: levels } = await supabase
      .from("competitions")
      .select("level")
      .eq("status", "active")

    // Get unique formats
    const { data: formats } = await supabase
      .from("competitions")
      .select("format")
      .eq("status", "active")

    // Process and deduplicate
    const uniqueCategories = [...new Set(categories?.map(c => c.category) || [])]
    const uniqueSubjects = [...new Set(subjects?.map(s => s.subject) || [])]
    const uniqueLevels = [...new Set(levels?.map(l => l.level) || [])]
    const uniqueFormats = [...new Set(formats?.map(f => f.format) || [])]

    return NextResponse.json({
      categories: uniqueCategories,
      subjects: uniqueSubjects,
      levels: uniqueLevels,
      formats: uniqueFormats,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}