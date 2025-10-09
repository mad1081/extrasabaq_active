import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Star, Upload, Award, BookOpen, Settings, Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const savedCompetitions = [
  {
    title: "Международная олимпиада по математике",
    type: "Олимпиада",
    deadline: "15 февраля 2025",
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    title: "AI Hackathon 2025",
    type: "Хакатон",
    deadline: "28 января 2025",
    image: "/placeholder.svg?height=150&width=200",
  },
]

const calendarEvents = [
  { date: "15 февраля", event: "Дедлайн математической олимпиады", type: "deadline" },
  { date: "28 января", event: "AI Hackathon регистрация", type: "deadline" },
  { date: "5 марта", event: "Результаты стартап конкурса", type: "result" },
]

const achievements = [
  { name: "Диплом 1 степени - Олимпиада по физике", date: "2024", file: "physics_diploma.pdf" },
  { name: "Сертификат участника - Hackathon 2024", date: "2024", file: "hackathon_cert.pdf" },
  { name: "Грамота - Конкурс эссе", date: "2023", file: "essay_award.pdf" },
]

export default function ProfilePage() {
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
              <Link href="/" className="text-gray-700 hover:text-pink-500 font-medium">
                Home
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-orange-500 font-medium">
                Team
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-green-500 font-medium">
                Community
              </Link>
              <Link href="/profile" className="text-blue-500 font-medium">
                Profile
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-500 font-medium">
                About Us
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="Profile Avatar"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                  <Button size="sm" className="absolute bottom-0 right-0 rounded-full p-2">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Алексей Иванов</h1>
                  <p className="text-gray-600 mb-2">@alex_student</p>
                  <p className="text-gray-500 mb-4">11 класс • Алматы, Казахстан</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="secondary">Математика</Badge>
                    <Badge variant="secondary">Информатика</Badge>
                    <Badge variant="secondary">Физика</Badge>
                  </div>
                </div>
                <div className="text-center">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-blue-500">12</div>
                      <div className="text-sm text-gray-500">Участий</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">5</div>
                      <div className="text-sm text-gray-500">Побед</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-500">8</div>
                      <div className="text-sm text-gray-500">Команд</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="calendar">Календарь</TabsTrigger>
              <TabsTrigger value="favorites">Избранное</TabsTrigger>
              <TabsTrigger value="achievements">Достижения</TabsTrigger>
              <TabsTrigger value="teams">Мои команды</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Мой календарь
                  </CardTitle>
                  <CardDescription>Важные даты и дедлайны соревнований</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {calendarEvents.map((event, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="text-center min-w-[80px]">
                          <div className="text-sm font-medium text-blue-500">{event.date}</div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{event.event}</p>
                        </div>
                        <Badge variant={event.type === "deadline" ? "destructive" : "default"}>
                          {event.type === "deadline" ? "Дедлайн" : "Результат"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
                    <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Интеграция с календарем</p>
                    <Button className="mt-4 bg-transparent" variant="outline">
                      Синхронизировать с Google Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Избранные соревнования
                  </CardTitle>
                  <CardDescription>Соревнования, которые вас интересуют</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {savedCompetitions.map((competition, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <div className="relative">
                          <Image
                            src={competition.image || "/placeholder.svg"}
                            alt={competition.title}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                          <Button size="sm" variant="secondary" className="absolute top-2 right-2">
                            <Star className="h-3 w-3 fill-current" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <Badge variant="outline" className="mb-2">
                            {competition.type}
                          </Badge>
                          <h3 className="font-semibold mb-2">{competition.title}</h3>
                          <p className="text-sm text-gray-500">Дедлайн: {competition.deadline}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    Мои достижения
                  </CardTitle>
                  <CardDescription>Дипломы, грамоты и сертификаты</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="p-3 bg-green-100 rounded-full">
                          <Award className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{achievement.name}</h3>
                          <p className="text-sm text-gray-500">{achievement.date}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Просмотр
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Загрузите новые достижения</p>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Загрузить файл
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teams">
              <Card>
                <CardHeader>
                  <CardTitle>Мои команды</CardTitle>
                  <CardDescription>Команды, в которых вы участвуете</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 mb-4">У вас пока нет активных команд</p>
                    <Button asChild>
                      <Link href="/team">Найти команду</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
