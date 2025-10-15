import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("user_calendar")
      .select(`
        *,
        competitions (
          id,
          title,
          description,
          image_url,
          deadline,
          event_date,
          level,
          subject,
          category,
          location,
          format
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ calendar: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, competitionId, reminderDate, notes } = await request.json()

    if (!userId || !competitionId) {
      return NextResponse.json({ error: "User ID and Competition ID are required" }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("user_calendar")
      .insert({ 
        user_id: userId, 
        competition_id: competitionId,
        reminder_date: reminderDate || null,
        notes: notes || null
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: "Added to calendar successfully",
        calendarItem: data,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const competitionId = searchParams.get("competitionId")

    if (!userId || !competitionId) {
      return NextResponse.json({ error: "User ID and Competition ID are required" }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase
      .from("user_calendar")
      .delete()
      .eq("user_id", userId)
      .eq("competition_id", competitionId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: "Removed from calendar successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}