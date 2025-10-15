"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCompetitions } from "@/hooks/useCompetitions"
import {
  MapPin,
  Search,
  Filter,
  Calendar,
  Trophy,
  Code,
  Lightbulb,
  PenTool,
  Sun,
  Briefcase,
  Heart,
  MessageCircle,
  Globe,
  Palette,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Header } from "@/components/Header"

// Icon mapping for dynamic categories
const iconMap: { [key: string]: any } = {
  "Trophy": Trophy,
  "Code": Code,
  "Lightbulb": Lightbulb,
  "PenTool": PenTool,
  "Sun": Sun,
  "Briefcase": Briefcase,
  "Heart": Heart,
  "MessageCircle": MessageCircle,
  "Globe": Globe,
  "Palette": Palette,
  "Zap": Zap,
  "Rocket": Lightbulb, // Fallback
  "Circle": Zap, // Fallback
}

export default function HomePage() {
  const [featuredCompetitions, setFeaturedCompetitions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured competitions and categories in parallel
        const [competitionsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/competitions?featured=true&limit=3'),
          fetch('/api/categories')
        ])

        const competitionsData = await competitionsResponse.json()
        const categoriesData = await categoriesResponse.json()

        if (competitionsResponse.ok) {
          setFeaturedCompetitions(competitionsData.competitions || [])
        }
        if (categoriesResponse.ok) {
          setCategories(categoriesData.categories || [])
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-green-50">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-orange-500 to-green-500 bg-clip-text text-transparent mb-6">
            Найди свое соревнование
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Платформа для школьников, где можно найти олимпиады, хакатоны и другие соревнования по своему профилю
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Поиск соревнований..." className="pl-10" />
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
              <MapPin className="h-4 w-4 mr-2" />
              Найти рядом
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-pink-500" />
                Карта соревнований в вашем регионе
              </CardTitle>
              <CardDescription>Активные соревнования рядом с вами</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600">Интерактивная карта будет здесь</p>
                  <p className="text-sm text-gray-500">Показывает соревнования в вашем регионе</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Выберите направление</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              // Loading skeleton for categories
              Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              categories.map((category: any, index: number) => {
                const Icon = iconMap[category.icon] || Zap
                return (
                  <Link
                    key={category.slug || index}
                    href={`/category/${category.slug}`}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`${category.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.count} активных</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Recent Competitions */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Последние соревнования</h2>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Фильтры
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredCompetitions.map((competition: any, index: number) => (
                <Card key={competition.id || index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <Link href={`/competition/${competition.id}`}>
                    <div className="relative">
                      <Image
                        src={competition.image_url || "/placeholder.svg"}
                        alt={competition.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                            competition.is_free ? "bg-green-500" : "bg-orange-500"
                          }`}
                        >
                          {competition.is_free ? "Бесплатно" : "Платно"}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{competition.category}</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{competition.level}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{competition.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{competition.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        Дедлайн: {new Date(competition.deadline).toLocaleDateString('ru-RU')}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))
            )}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Показать больше соревнований
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-24%20at%2017.14.15-7secNVv7zKkZaAXllG16x72eGCoEmg.jpeg"
                alt="Extrasabaq Logo"
                width={120}
                height={40}
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400">Платформа для поиска соревнований и формирования команд</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white" prefetch={false}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white" prefetch={false}>
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white" prefetch={false}>
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-white" prefetch={false}>
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Олимпиады
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Хакатоны
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Стартапы
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Летние программы
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@extrasabaq.com</li>
                <li>+7 (XXX) XXX-XX-XX</li>
                <li>Алматы, Казахстан</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Extrasabaq. Все права защищены.</p>
          </div>
        </div>
      </footer>
      
    </div>
  )
}
