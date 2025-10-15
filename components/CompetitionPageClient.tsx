"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth"
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Globe,
  Award,
  FileText,
  ExternalLink,
  Share2,
  CalendarPlus,
  Heart,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export function CompetitionPageClient({ competition, competitionId }: { competition: any, competitionId: string }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInCalendar, setIsInCalendar] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      checkFavoriteStatus()
      checkCalendarStatus()
    }
  }, [user, competitionId])

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(`/api/user/favorites?userId=${user?.id}`)
      if (response.ok) {
        const data = await response.json()
        const isFav = data.favorites.some((fav: any) => fav.competition_id === competitionId)
        setIsFavorite(isFav)
      }
    } catch (error) {
      console.error('Failed to check favorite status:', error)
    }
  }

  const checkCalendarStatus = async () => {
    try {
      const response = await fetch(`/api/user/calendar?userId=${user?.id}`)
      if (response.ok) {
        const data = await response.json()
        const isInCal = data.calendar.some((cal: any) => cal.competition_id === competitionId)
        setIsInCalendar(isInCal)
      }
    } catch (error) {
      console.error('Failed to check calendar status:', error)
    }
  }

  const handleToggleFavorite = async () => {
    if (!user) return

    setLoading(true)
    try {
      if (isFavorite) {
        await fetch(`/api/user/favorites?userId=${user.id}&competitionId=${competitionId}`, {
          method: 'DELETE'
        })
        setIsFavorite(false)
      } else {
        await fetch('/api/user/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            competitionId: competitionId
          })
        })
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleCalendar = async () => {
    if (!user) return

    setLoading(true)
    try {
      if (isInCalendar) {
        await fetch(`/api/user/calendar?userId=${user.id}&competitionId=${competitionId}`, {
          method: 'DELETE'
        })
        setIsInCalendar(false)
      } else {
        await fetch('/api/user/calendar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            competitionId: competitionId,
            notes: `Добавлено в календарь: ${competition.title}`
          })
        })
        setIsInCalendar(true)
      }
    } catch (error) {
      console.error('Failed to toggle calendar:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-24%20at%2017.14.15-7secNVv7zKkZaAXllG16x72eGCoEmg.jpeg"
                  alt="Extrasabaq Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-500 font-medium" prefetch={false}>
                Home
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-orange-500 font-medium" prefetch={false}>
                Team
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-green-500 font-medium" prefetch={false}>
                Community
              </Link>
              <Link href="/profile" className="text-gray-700 hover:text-blue-500 font-medium" prefetch={false}>
                Profile
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-500 font-medium" prefetch={false}>
                About Us
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Competition Hero */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative mb-6">
                <Image
                  src={competition.image_url || "/placeholder.svg"}
                  alt={competition.title}
                  width={600}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
                {competition.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      <Star className="h-3 w-3 mr-1" />
                      Рекомендуем
                    </Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge variant={competition.is_free ? "secondary" : "destructive"}>
                    {competition.is_free ? "Бесплатно" : "Платно"}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{competition.level}</Badge>
                <Badge variant="outline">{competition.subject}</Badge>
                <Badge variant="outline">{competition.format}</Badge>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{competition.title}</h1>

              <p className="text-lg text-gray-600 mb-6">{competition.description}</p>

              <div className="prose max-w-none text-gray-700">
                {competition.full_description && competition.full_description.split("\n").map(
                  (paragraph: string, index: number) =>
                    paragraph.trim() && (
                      <p key={index} className="mb-4">
                        {paragraph.trim()}
                      </p>
                    ),
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Информация о соревновании</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Дедлайн подачи</p>
                      <p className="text-sm text-gray-600">
                        {new Date(competition.deadline).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>

                  {competition.event_date && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Дата проведения</p>
                        <p className="text-sm text-gray-600">
                          {new Date(competition.event_date).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">Место проведения</p>
                      <p className="text-sm text-gray-600">{competition.location || "Не указано"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Формат участия</p>
                      <p className="text-sm text-gray-600">{competition.team_size}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Язык</p>
                      <p className="text-sm text-gray-600">{competition.language || "Не указано"}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full" size="lg" disabled={!competition.website_url}
                    onClick={() => window.open(competition.website_url, '_blank')}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Подать заявку
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleToggleFavorite}
                        disabled={loading || !user}
                        className={isFavorite ? "bg-red-50 text-red-600 border-red-200" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                        {isFavorite ? "В избранном" : "В избранное"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleToggleCalendar}
                        disabled={loading || !user}
                        className={isInCalendar ? "bg-blue-50 text-blue-600 border-blue-200" : ""}
                      >
                        <CalendarPlus className="h-4 w-4 mr-2" />
                        {isInCalendar ? "В календаре" : "В календарь"}
                      </Button>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Поделиться
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <p className="font-medium mb-2">Организатор</p>
                    <p className="text-sm text-gray-600">{competition.organizer || "Не указано"}</p>
                  </div>

                  {competition.website_url && (
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href={competition.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Официальный сайт
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Prizes */}
            {competition.prizes && competition.prizes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Призы и награды
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {competition.prizes.map((prize: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-700">{prize}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {competition.requirements && competition.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Требования к участникам
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {competition.requirements.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
