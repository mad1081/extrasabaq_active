import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const supabase = createServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Get user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (userError) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Login successful",
      user: userData,
      session: data.session,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
