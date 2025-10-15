"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/Header"
import { Plus, Filter, Users, Calendar, MessageCircle, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function TeamPage() {
  const [teamPosts, setTeamPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeamPosts = async () => {
      try {
        const response = await fetch('/api/team-posts')
        const data = await response.json()
        if (response.ok) {
          setTeamPosts(data.teamPosts || [])
        }
      } catch (error) {
        console.error('Failed to fetch team posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamPosts()
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
              Найди свою команду
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Создавай команды или присоединяйся к существующим для участия в соревнованиях
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              <Plus className="h-5 w-5 mr-2" />
              Создать набор в команду
            </Button>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Поиск по названию..." className="pl-10 w-full sm:w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Тип мероприятия" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="olympiad">Олимпиада</SelectItem>
                  <SelectItem value="hackathon">Хакатон</SelectItem>
                  <SelectItem value="startup">Стартап конкурс</SelectItem>
                  <SelectItem value="essay">Конкурс эссе</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Предмет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все предметы</SelectItem>
                  <SelectItem value="math">Математика</SelectItem>
                  <SelectItem value="cs">Информатика</SelectItem>
                  <SelectItem value="physics">Физика</SelectItem>
                  <SelectItem value="business">Бизнес</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Больше фильтров
            </Button>
          </div>
        </div>
      </section>

      {/* Team Posts */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              teamPosts.map((post: any) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <Badge variant="outline">{post.subject}</Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(post.created_at).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                        <CardDescription className="text-base">{post.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <Image
                          src={post.users?.avatar_url || "/placeholder.svg"}
                          alt={post.users?.username || "User"}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="text-right">
                          <p className="font-medium text-sm">{post.users?.username || "Unknown"}</p>
                          <Button size="sm" variant="outline" className="mt-1 bg-transparent">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Написать
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Мероприятие:</span>
                      </div>
                      <div className="col-span-1 md:col-span-3">
                        <span className="font-medium">{post.event_name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Нужно людей:</span>
                      </div>
                      <div>
                        <span className="font-medium">{post.needed_members}</span>
                      </div>

                      <div className="text-gray-600">Возраст:</div>
                      <div>
                        <span className="font-medium">{post.age_limit || "Не указан"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Загрузить больше постов
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
