import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search, Calendar, MapPin, Users, Trophy, Code, Lightbulb, Star, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categoryInfo = {
  олимпиады: {
    title: "Олимпиады",
    description:
      "Академические соревнования по различным предметам для проверки знаний и навыков решения задач. Олимпиады помогают развивать аналитическое мышление и углублять знания в выбранной области.",
    icon: Trophy,
    color: "bg-pink-500",
  },
  хакатоны: {
    title: "Хакатоны",
    description:
      "Интенсивные соревнования по программированию и разработке, где команды создают проекты за ограниченное время. Отличная возможность применить технические навыки и поработать в команде.",
    icon: Code,
    color: "bg-orange-500",
  },
  "стартап-конкурсы": {
    title: "Стартап конкурсы",
    description:
      "Соревнования для молодых предпринимателей, где участники представляют свои бизнес-идеи и проекты. Возможность получить менторство, инвестиции и развить предпринимательские навыки.",
    icon: Lightbulb,
    color: "bg-green-500",
  },
}

const activeCompetitions = [
  {
    id: 1,
    title: "Международная олимпиада по математике IMO 2025",
    description: "Престижная математическая олимпиада для школьников со всего мира",
    image: "/placeholder.svg?height=200&width=300",
    deadline: "15 февраля 2025",
    level: "Международный",
    subject: "Математика",
    ageLimit: "15-18 лет",
    teamSize: "Индивидуально",
    location: "Онлайн/Офлайн",
    free: true,
    featured: true,
  },
  {
    id: 2,
    title: "Республиканская олимпиада по физике",
    description: "Национальная олимпиада по физике для учащихся 9-11 классов",
    image: "/placeholder.svg?height=200&width=300",
    deadline: "28 января 2025",
    level: "Республиканский",
    subject: "Физика",
    ageLimit: "15-17 лет",
    teamSize: "Индивидуально",
    location: "Алматы",
    free: true,
    featured: false,
  },
  {
    id: 3,
    title: "Олимпиада по информатике КазНИТУ",
    description: "Региональная олимпиада по программированию и алгоритмам",
    image: "/placeholder.svg?height=200&width=300",
    deadline: "10 марта 2025",
    level: "Региональный",
    subject: "Информатика",
    ageLimit: "16-18 лет",
    teamSize: "Индивидуально",
    location: "Алматы",
    free: false,
    featured: false,
  },
]

const pastCompetitions = [
  {
    id: 4,
    title: "Международная олимпиада по математике IMO 2024",
    description: "Прошедшая математическая олимпиада (ежегодная)",
    image: "/placeholder.svg?height=200&width=300",
    deadline: "Прошел",
    level: "Международный",
    subject: "Математика",
    ageLimit: "15-18 лет",
    teamSize: "Индивидуально",
    location: "Великобритания",
    free: true,
    nextYear: "2025",
  },
  {
    id: 5,
    title: "Республиканская олимпиада по химии 2024",
    description: "Национальная олимпиада по химии (ежегодная)",
    image: "/placeholder.svg?height=200&width=300",
    deadline: "Прошел",
    level: "Республиканский",
    subject: "Химия",
    ageLimit: "15-17 лет",
    teamSize: "Индивидуально",
    location: "Нур-Султан",
    free: true,
    nextYear: "2025",
  },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryInfo[params.slug as keyof typeof categoryInfo] || categoryInfo["олимпиады"]
  const Icon = category.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-purple-50">
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
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
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
            <div className={`${category.color} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}>
              <Icon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{category.title}</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Поиск соревнований..." className="pl-10 w-full sm:w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Предмет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все предметы</SelectItem>
                  <SelectItem value="math">Математика</SelectItem>
                  <SelectItem value="physics">Физика</SelectItem>
                  <SelectItem value="chemistry">Химия</SelectItem>
                  <SelectItem value="cs">Информатика</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Уровень" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все уровни</SelectItem>
                  <SelectItem value="international">Международный</SelectItem>
                  <SelectItem value="national">Республиканский</SelectItem>
                  <SelectItem value="regional">Региональный</SelectItem>
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

      {/* Competitions Tabs */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="active">Активные</TabsTrigger>
              <TabsTrigger value="past">Прошедшие</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="grid gap-6">
                {activeCompetitions.map((competition) => (
                  <Card key={competition.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row">
                      <div className="relative lg:w-80">
                        <Image
                          src={competition.image || "/placeholder.svg"}
                          alt={competition.title}
                          width={300}
                          height={200}
                          className="w-full h-48 lg:h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
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
                          <Badge variant={competition.free ? "secondary" : "destructive"}>
                            {competition.free ? "Бесплатно" : "Платно"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">{competition.level}</Badge>
                          <Badge variant="outline">{competition.subject}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{competition.title}</h3>
                        <p className="text-gray-600 mb-4">{competition.description}</p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">Дедлайн: {competition.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{competition.teamSize}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{competition.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{competition.ageLimit}</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button asChild className="flex-1">
                            <Link href={`/competition/${competition.id}`}>Подробнее</Link>
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
            </TabsContent>

            <TabsContent value="past">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Прошедшие соревнования</h3>
                <p className="text-gray-500">
                  Информация о ежегодных соревнованиях для планирования участия в следующем году
                </p>
              </div>
              <div className="grid gap-6">
                {pastCompetitions.map((competition) => (
                  <Card key={competition.id} className="hover:shadow-lg transition-shadow opacity-75">
                    <div className="flex flex-col lg:flex-row">
                      <div className="relative lg:w-80">
                        <Image
                          src={competition.image || "/placeholder.svg"}
                          alt={competition.title}
                          width={300}
                          height={200}
                          className="w-full h-48 lg:h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none grayscale"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary">Завершено</Badge>
                        </div>
                        {competition.nextYear && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-blue-500 hover:bg-blue-600">Следующий: {competition.nextYear}</Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">{competition.level}</Badge>
                          <Badge variant="outline">{competition.subject}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{competition.title}</h3>
                        <p className="text-gray-600 mb-4">{competition.description}</p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">Статус: {competition.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{competition.teamSize}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{competition.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{competition.ageLimit}</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1 bg-transparent" asChild>
                            <Link href={`/competition/${competition.id}`}>Подробнее</Link>
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
