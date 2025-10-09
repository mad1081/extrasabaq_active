import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const category = searchParams.get("category")
    const subject = searchParams.get("subject")
    const level = searchParams.get("level")
    const format = searchParams.get("format")
    const isFree = searchParams.get("is_free")
    const status = searchParams.get("status") || "active"
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let dbQuery = supabase
      .from("competitions")
      .select("*")
      .eq("status", status)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })

    // Apply filters
    if (category) {
      dbQuery = dbQuery.eq("category", category)
    }
    if (subject) {
      dbQuery = dbQuery.eq("subject", subject)
    }
    if (level) {
      dbQuery = dbQuery.eq("level", level)
    }
    if (format) {
      dbQuery = dbQuery.eq("format", format)
    }
    if (isFree !== null && isFree !== "") {
      dbQuery = dbQuery.eq("is_free", isFree === "true")
    }

    // Full-text search
    if (query) {
      dbQuery = dbQuery.or(
        `title.ilike.%${query}%,description.ilike.%${query}%,full_description.ilike.%${query}%,organizer.ilike.%${query}%,subject.ilike.%${query}%,location.ilike.%${query}%`,
      )
    }

    // Apply pagination
    dbQuery = dbQuery.range(offset, offset + limit - 1)

    const { data, error } = await dbQuery

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Get total count for pagination
    let countQuery = supabase.from("competitions").select("*", { count: "exact", head: true }).eq("status", status)

    if (category) countQuery = countQuery.eq("category", category)
    if (subject) countQuery = countQuery.eq("subject", subject)
    if (level) countQuery = countQuery.eq("level", level)
    if (format) countQuery = countQuery.eq("format", format)
    if (isFree !== null && isFree !== "") countQuery = countQuery.eq("is_free", isFree === "true")
    if (query) {
      countQuery = countQuery.or(
        `title.ilike.%${query}%,description.ilike.%${query}%,full_description.ilike.%${query}%,organizer.ilike.%${query}%,subject.ilike.%${query}%,location.ilike.%${query}%`,
      )
    }

    const { count } = await countQuery

    return NextResponse.json({
      competitions: data || [],
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: offset + limit < (count || 0),
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
