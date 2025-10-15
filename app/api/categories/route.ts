import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Get all unique categories with their counts
    const { data, error } = await supabase
      .from("competitions")
      .select("category")
      .eq("status", "active")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Count occurrences of each category
    const categoryCounts: { [key: string]: number } = {}
    data?.forEach((item) => {
      const category = item.category
      categoryCounts[category] = (categoryCounts[category] || 0) + 1
    })

    // Map categories to their display info and icons
    const categoryMapping: { [key: string]: any } = {
      "Олимпиады": { name: "Олимпиады", icon: "Trophy", color: "bg-pink-500" },
      "Хакатоны": { name: "Хакатоны", icon: "Code", color: "bg-orange-500" },
      "Стартап конкурсы": { name: "Стартап конкурсы", icon: "Lightbulb", color: "bg-green-500" },
      "Конкурсы Эссе": { name: "Конкурсы Эссе", icon: "PenTool", color: "bg-blue-500" },
      "Летние программы": { name: "Летние программы", icon: "Sun", color: "bg-yellow-500" },
      "Стажировки": { name: "Стажировки", icon: "Briefcase", color: "bg-purple-500" },
      "Волонтерские организации": { name: "Волонтерские организации", icon: "Heart", color: "bg-red-500" },
      "Дебаты": { name: "Дебаты", icon: "MessageCircle", color: "bg-indigo-500" },
      "MUN": { name: "MUN", icon: "Globe", color: "bg-teal-500" },
      "Искусство": { name: "Искусство", icon: "Palette", color: "bg-pink-400" },
      "Спорт": { name: "Спорт", icon: "Zap", color: "bg-orange-400" },
      "Акселераторы": { name: "Акселераторы", icon: "Rocket", color: "bg-cyan-500" },
      "Конкурсы дизайна": { name: "Конкурсы дизайна", icon: "Palette", color: "bg-purple-400" },
      "Научные конференции": { name: "Научные конференции", icon: "Microscope", color: "bg-blue-400" },
      "Музыкальные конкурсы": { name: "Музыкальные конкурсы", icon: "Music", color: "bg-pink-300" },
    }

    // Create final categories array with counts
    const categories = Object.entries(categoryCounts).map(([category, count]) => {
      const mapping = categoryMapping[category] || {
        name: category,
        icon: "Circle",
        color: "bg-gray-500"
      }
      return {
        name: mapping.name,
        slug: category.toLowerCase().replace(/\s+/g, "-").replace(/ё/g, "е"),
        icon: mapping.icon,
        color: mapping.color,
        count: count
      }
    })

    // Sort by count (most popular first)
    categories.sort((a, b) => b.count - a.count)

    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
