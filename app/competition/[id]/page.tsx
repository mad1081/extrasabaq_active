import { CompetitionPageClient } from "@/components/CompetitionPageClient"

export default async function CompetitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // Fetch competition data from API
  let competitionData = null
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/api/competitions/${id}`, {
      cache: 'no-store'
    })
    if (response.ok) {
      const data = await response.json()
      competitionData = data.competition
    }
  } catch (error) {
    console.error('Failed to fetch competition data:', error)
  }

  const competition = competitionData || {
    title: "Соревнование не найдено",
    description: "К сожалению, информация о данном соревновании недоступна.",
    image_url: "/placeholder.svg",
    is_free: true,
    featured: false,
    level: "Не указано",
    subject: "Не указано",
    format: "Не указано",
    deadline: new Date().toISOString(),
    team_size: "Не указано",
    location: "Не указано",
    language: "Не указано",
    organizer: "Не указано",
    website_url: null,
    prizes: [],
    requirements: [],
    full_description: null,
    event_date: null
  }

  return <CompetitionPageClient competition={competition} competitionId={id} />
}