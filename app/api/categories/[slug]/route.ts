import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    // Decode the slug to handle URL encoding
    const decodedSlug = decodeURIComponent(slug)

    // Convert English slug back to Cyrillic category name
    const getCyrillicCategoryName = (englishSlug: string) => {
      const reverseSlugMap: { [key: string]: string } = {
        'olympiads': 'Олимпиады',
        'hackathons': 'Хакатоны',
        'startup-competitions': 'Стартап конкурсы',
        'essay-competitions': 'Конкурсы Эссе',
        'summer-programs': 'Летние программы',
        'internships': 'Стажировки',
        'volunteer-organizations': 'Волонтерские организации',
        'debates': 'Дебаты',
        'mun': 'MUN',
        'arts': 'Искусство',
        'sports': 'Спорт',
        'research': 'Исследования',
        'interdisciplinary': 'Междисциплинарные',
        'natural-sciences': 'Естественные науки',
        'entrepreneurship': 'Предпринимательство',
        'stem': 'STEM',
        'academic-courses': 'Академические курсы',
        'computer-sciences': 'Компьютерные науки',
        'accelerators': 'Акселераторы',
        'design-competitions': 'Конкурсы дизайна',
        'scientific-conferences': 'Научные конференции'
      }
      return reverseSlugMap[englishSlug] || englishSlug
    }

    const categoryName = getCyrillicCategoryName(decodedSlug)

    console.log("Fetching category data:", {
      slug,
      decodedSlug,
      categoryName
    })

    const supabase = createServerClient()

    // Get competitions for this category
    const { data: activeCompetitions, error: activeError } = await supabase
      .from("competitions")
      .select("*")
      .eq("category", categoryName)
      .eq("status", "active")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })

    if (activeError) {
      return NextResponse.json({ error: activeError.message }, { status: 400 })
    }

    // Get past competitions for this category
    const { data: pastCompetitions, error: pastError } = await supabase
      .from("competitions")
      .select("*")
      .eq("category", categoryName)
      .eq("status", "past")
      .order("created_at", { ascending: false })

    if (pastError) {
      return NextResponse.json({ error: pastError.message }, { status: 400 })
    }

    // Get category info
    const categoryMapping: { [key: string]: any } = {
      "Олимпиады": { 
        title: "Олимпиады",
        description: "Академические соревнования по различным предметам для проверки знаний и навыков решения задач. Олимпиады помогают развивать аналитическое мышление и углублять знания в выбранной области.",
        icon: "Trophy",
        color: "bg-pink-500"
      },
      "Хакатоны": { 
        title: "Хакатоны",
        description: "Интенсивные соревнования по программированию и разработке, где команды создают проекты за ограниченное время. Отличная возможность применить технические навыки и поработать в команде.",
        icon: "Code",
        color: "bg-orange-500"
      },
      "Стартап конкурсы": { 
        title: "Стартап конкурсы",
        description: "Соревнования для молодых предпринимателей, где участники представляют свои бизнес-идеи и проекты. Возможность получить менторство, инвестиции и развить предпринимательские навыки.",
        icon: "Lightbulb",
        color: "bg-green-500"
      },
      "Летние программы": {
        title: "Летние программы",
        description: "Образовательные программы и стажировки, проводимые в летний период. Возможность получить практический опыт, новые знания и познакомиться с профессионалами в различных областях.",
        icon: "Sun",
        color: "bg-yellow-500"
      },
      "Акселераторы": {
        title: "Акселераторы",
        description: "Программы ускоренного развития стартапов и бизнес-проектов. Получите менторство, инвестиции и доступ к ресурсам для быстрого роста вашего проекта.",
        icon: "Rocket",
        color: "bg-cyan-500"
      }
    }

    const categoryInfo = categoryMapping[categoryName] || {
      title: categoryName,
      description: `Соревнования и мероприятия в категории "${categoryName}". Найдите подходящие возможности для развития ваших навыков и интересов.`,
      icon: "Circle",
      color: "bg-gray-500"
    }

    return NextResponse.json({
      category: categoryInfo,
      activeCompetitions: activeCompetitions || [],
      pastCompetitions: pastCompetitions || []
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
