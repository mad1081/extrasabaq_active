"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Star, Clock, Sun, ExternalLink, Search, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Competition {
  id: string
  title: string
  description: string
  deadline: string
  level: string
  subject: string
  age_limit: string
  location: string
  format: string
  is_free: boolean
  website_url: string
  organizer: string
  image_url: string
  featured: boolean
}

interface Filters {
  categories: Array<{ value: string; label: string; count: number }>
  subjects: Array<{ value: string; label: string }>
  levels: Array<{ value: string; label: string }>
  formats: Array<{ value: string; label: string }>
}

export default function SummerProgramsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [formatFilter, setFormatFilter] = useState("all")
  const [costFilter, setCostFilter] = useState("all")
  const [availableFilters, setAvailableFilters] = useState<Filters>({
    categories: [],
    subjects: [],
    levels: [],
    formats: [],
  })
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    fetchFilters()
  }, [])

  useEffect(() => {
    fetchCompetitions()
  }, [searchQuery, subjectFilter, formatFilter, costFilter])

  const fetchFilters = async () => {
    try {
      const response = await fetch("/api/competitions/filters?category=Летние программы")
      if (response.ok) {
        const data = await response.json()
        setAvailableFilters(data.filters)
      }
    } catch (error) {
      console.error("Failed to fetch filters:", error)
    }
  }

  const fetchCompetitions = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        category: "Летние программы",
        status: "active",
        limit: "50",
      })

      if (searchQuery) params.append("q", searchQuery)
      if (subjectFilter !== "all") params.append("subject", subjectFilter)
      if (formatFilter !== "all") params.append("format", formatFilter)
      if (costFilter !== "all") params.append("is_free", costFilter === "free" ? "true" : "false")

      const response = await fetch(`/api/competitions/search?${params}`)
      if (response.ok) {
        const data = await response.json()
        setCompetitions(data.competitions || [])
        setTotalCount(data.pagination?.total || 0)
      } else {
        console.error("Failed to fetch competitions")
        setCompetitions([])
      }
    } catch (error) {
      console.error("Failed to fetch competitions:", error)
      setCompetitions([])
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSubjectFilter("all")
    setFormatFilter("all")
    setCostFilter("all")
  }

  const handleSearch = () => {
    fetchCompetitions()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
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
              <Link href="/" className="text-gray-700 hover:text-pink-500 font-medium">
                Home
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-orange-500 font-medium">
                Team
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-green-500 font-medium">
                Community
              </Link>
              <Link href="/profile" className="text-gray-700 hover:text-blue-500 font-medium">
                Profile
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-500 font-medium">
                About Us
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Войти
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Hero */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="bg-yellow-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Sun className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Летние программы</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Летние академические программы в ведущих университетах мира. Возможность получить опыт университетской
              жизни, изучить интересующие предметы и подготовиться к поступлению в зарубежные вузы.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="space-y-4">
            {/* Main search */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Поиск программ, университетов, направлений..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} className="bg-gradient-to-r from-yellow-500 to-orange-500">
                <Search className="h-4 w-4 mr-2" />
                Найти
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Предмет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все предметы</SelectItem>
                  {availableFilters.subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={formatFilter} onValueChange={setFormatFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Формат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все форматы</SelectItem>
                  {availableFilters.formats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={costFilter} onValueChange={setCostFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Стоимость" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая</SelectItem>
                  <SelectItem value="free">Бесплатно</SelectItem>
                  <SelectItem value="paid">Платно</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                Сбросить фильтры
              </Button>
            </div>

            {/* Results count */}
            <div className="text-sm text-gray-600">
              Найдено программ: <span className="font-semibold">{competitions.length}</span>
              {totalCount > 0 && totalCount !== competitions.length && ` из ${totalCount}`}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="active">Активные программы ({competitions.length})</TabsTrigger>
              <TabsTrigger value="past">Архив программ</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {loading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto mb-4" />
                  <p className="text-gray-600">Загрузка программ...</p>
                </div>
              ) : competitions.length === 0 ? (
                <div className="text-center py-12">
                  <Sun className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Программы не найдены</p>
                  <p className="text-sm text-gray-500">Попробуйте изменить параметры поиска</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                    Сбросить фильтры
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {competitions.map((program) => (
                    <Card key={program.id} className="hover:shadow-lg transition-shadow">
                      <div className="flex flex-col lg:flex-row">
                        <div className="relative lg:w-80">
                          <Image
                            src={program.image_url || "/placeholder.svg"}
                            alt={program.title}
                            width={300}
                            height={200}
                            className="w-full h-48 lg:h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                          />
                          {program.featured && (
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-yellow-500 hover:bg-yellow-600">
                                <Star className="h-3 w-3 mr-1" />
                                Рекомендуем
                              </Badge>
                            </div>
                          )}
                          <div className="absolute top-4 right-4">
                            <Badge variant={program.is_free ? "secondary" : "destructive"}>
                              {program.is_free ? "Бесплатно" : "Платно"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">{program.level}</Badge>
                            <Badge variant="outline">{program.subject}</Badge>
                            <Badge variant="outline">
                              {program.format === "online"
                                ? "Онлайн"
                                : program.format === "offline"
                                  ? "Очно"
                                  : "Гибридный"}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                          <p className="text-gray-600 mb-4">{program.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">
                                Дедлайн: {new Date(program.deadline).toLocaleDateString("ru-RU")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">{program.age_limit}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">{program.location || "Онлайн"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">{program.organizer}</span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button asChild className="flex-1">
                              <Link href={`/competition/${program.id}`}>Подробнее</Link>
                            </Button>
                            <Button variant="outline" asChild>
                              <a href={program.website_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Сайт
                              </a>
                            </Button>
                            <Button variant="outline" size="icon">
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              <div className="text-center py-12">
                <Sun className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Архив программ будет доступен позже</p>
                <p className="text-sm text-gray-500">Здесь будут отображаться прошедшие программы для планирования</p>
              </div>
            </TabsContent>
          </Tabs>
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
                  <Link href="/" className="hover:text-white">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white">
                    Команды
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white">
                    Сообщество
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-white">
                    Профиль
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/category/олимпиады" className="hover:text-white">
                    Олимпиады
                  </Link>
                </li>
                <li>
                  <Link href="/category/хакатоны" className="hover:text-white">
                    Хакатоны
                  </Link>
                </li>
                <li>
                  <Link href="/category/стартап-конкурсы" className="hover:text-white">
                    Стартапы
                  </Link>
                </li>
                <li>
                  <Link href="/category/летние-программы" className="hover:text-white">
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
