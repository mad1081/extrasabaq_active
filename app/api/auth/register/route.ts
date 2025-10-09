import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, username, age, city, school, grade, interests } = await request.json()

    const supabase = createServerClient()

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 400 })
    }

    // Create user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        username,
        age: age || null,
        city: city || null,
        school: school || null,
        grade: grade || null,
        interests: interests || null,
      })
      .select()
      .single()

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userData,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
