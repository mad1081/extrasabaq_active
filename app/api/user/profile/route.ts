import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, fullName, username, grade, city, school, interests } = body

    if (!userId || !fullName || !username) {
      return NextResponse.json({ error: "User ID, full name, and username are required" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Insert or update user data in the users table
    console.log("Saving user data:", {
      userId,
      fullName,
      username,
      grade,
      city,
      school,
      interests,
      email: body.email
    })

    const { data, error } = await supabase
      .from("users")
      .upsert({
        id: userId,
        email: body.email,
        full_name: fullName,
        username: username,
        grade: grade || null,
        city: city || null,
        school: school || null,
        interests: interests || null,
        updated_at: new Date().toISOString()
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("User data saved successfully:", data)

    return NextResponse.json({ user: data[0] })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ user: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
