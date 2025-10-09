import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Filter, Users, Calendar, MessageCircle, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const teamPosts = [
  {
    id: 1,
    title: "Ищем программистов для AI Hackathon",
    event: "AI Hackathon 2025",
    type: "Хакатон",
    subject: "Информатика",
    needed: 2,
    ageLimit: "16-18 лет",
    author: "alex_dev",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    postedDate: "2 дня назад",
    description: "Ищем опытных разработчиков для участия в хакатоне по ИИ. Нужны знания Python, ML.",
  },
  {
    id: 2,
    title: "Команда для математической олимпиады",
    event: "Международная олимпиада по математике",
    type: "Олимпиада",
    subject: "Математика",
    needed: 1,
    ageLimit: "15-17 лет",
    author: "math_genius",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    postedDate: "1 день назад",
    description: "Собираем сильную команду для участия в международной олимпиаде.",
  },
  {
    id: 3,
    title: "Стартап команда - ищем маркетолога",
    event: "Startup Weekend",
    type: "Стартап конкурс",
    subject: "Бизнес",
    needed: 1,
    ageLimit: "16-19 лет",
    author: "startup_leader",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    postedDate: "3 дня назад",
    description: "У нас есть идея и разработчики, нужен креативный маркетолог для завершения команды.",
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
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
              <Link href="/team" className="text-orange-500 font-medium">
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
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              >
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

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
            {teamPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.type}</Badge>
                        <Badge variant="outline">{post.subject}</Badge>
                        <span className="text-sm text-gray-500">{post.postedDate}</span>
                      </div>
                      <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                      <CardDescription className="text-base">{post.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <Image
                        src={post.authorAvatar || "/placeholder.svg"}
                        alt={post.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="text-right">
                        <p className="font-medium text-sm">{post.author}</p>
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
                      <span className="font-medium">{post.event}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Нужно людей:</span>
                    </div>
                    <div>
                      <span className="font-medium">{post.needed}</span>
                    </div>

                    <div className="text-gray-600">Возраст:</div>
                    <div>
                      <span className="font-medium">{post.ageLimit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
