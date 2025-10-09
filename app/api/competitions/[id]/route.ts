import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase.from("competitions").select("*").eq("id", params.id).single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!data) {
      return NextResponse.json({ error: "Competition not found" }, { status: 404 })
    }

    return NextResponse.json({ competition: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
