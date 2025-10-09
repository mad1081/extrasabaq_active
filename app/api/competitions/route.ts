import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const subject = searchParams.get("subject")
    const level = searchParams.get("level")
    const format = searchParams.get("format")
    const isFree = searchParams.get("is_free")
    const status = searchParams.get("status") || "active"
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const supabase = createServerClient()

    let query = supabase
      .from("competitions")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (category) {
      query = query.eq("category", category)
    }
    if (subject) {
      query = query.eq("subject", subject)
    }
    if (level) {
      query = query.eq("level", level)
    }
    if (format) {
      query = query.eq("format", format)
    }
    if (isFree !== null) {
      query = query.eq("is_free", isFree === "true")
    }
    if (featured) {
      query = query.eq("featured", featured === "true")
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,organizer.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ competitions: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const competitionData = await request.json()

    const supabase = createServerClient()

    const { data, error } = await supabase.from("competitions").insert(competitionData).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: "Competition created successfully",
        competition: data,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
