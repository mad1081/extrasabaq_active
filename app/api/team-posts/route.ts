import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const subject = searchParams.get("subject")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const supabase = createServerClient()

    let query = supabase
      .from("team_posts")
      .select(`
        *,
        users!team_posts_author_id_fkey (
          id,
          full_name,
          username,
          avatar_url
        )
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (category) {
      query = query.eq("category", category)
    }
    if (subject) {
      query = query.eq("subject", subject)
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,event_name.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ teamPosts: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("team_posts")
      .insert(postData)
      .select(`
        *,
        users!team_posts_author_id_fkey (
          id,
          full_name,
          username,
          avatar_url
        )
      `)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: "Team post created successfully",
        teamPost: data,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
