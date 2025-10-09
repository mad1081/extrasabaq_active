import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  BookmarkPlus,
  CalendarPlus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const competitionData = {
  1: {
    title: "Международная олимпиада по математике IMO 2025",
    description:
      "Международная математическая олимпиада (IMO) — это ежегодное математическое соревнование для учащихся средних школ. Это одна из самых престижных математических олимпиад в мире.",
    fullDescription: `
      Международная математическая олимпиада (IMO) проводится ежегодно с 1959 года и является самым престижным математическим соревнованием для школьников в мире. 
      
      Олимпиада состоит из двух дней, в каждый из которых участники решают по 3 задачи за 4.5 часа. Задачи охватывают различные области математики: алгебру, комбинаторику, геометрию и теорию чисел.
      
      Участие в IMO — это уникальная возможность проверить свои математические способности на международном уровне, познакомиться с талантливыми сверстниками со всего мира и получить признание в математическом сообществе.
    `,
    image: "/placeholder.svg?height=400&width=600",
    deadline: "15 февраля 2025",
    eventDate: "10-21 июля 2025",
    level: "Международный",
    subject: "Математика",
    ageLimit: "15-18 лет",
    teamSize: "Индивидуально",
    location: "Австралия, Сидней",
    format: "Офлайн",
    free: true,
    language: "Английский, Русский",
    website: "https://imo-official.org",
    organizer: "Международный математический союз",
    prizes: [
      "Золотые медали (топ 1/12 участников)",
      "Серебряные медали (следующие 2/12 участников)",
      "Бронзовые медали (следующие 3/12 участников)",
      "Почетные грамоты",
    ],
    requirements: [
      "Возраст до 20 лет на момент проведения",
      "Не должен быть зачислен в университет",
      "Прохождение национального отбора",
      "Знание английского языка на базовом уровне",
    ],
    schedule: [
      { date: "15 февраля 2025", event: "Дедлайн подачи заявок" },
      { date: "1-15 марта 2025", event: "Национальный отбор" },
      { date: "1 мая 2025", event: "Объявление команды" },
      { date: "10-21 июля 2025", event: "Проведение олимпиады" },
    ],
  },
}

export default function CompetitionPage({ params }: { params: { id: string } }) {
  const competition = competitionData[params.id as keyof typeof competitionData] || competitionData[1]

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
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Регистрация
              </Button>
            </div>
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
                  src={competition.image || "/placeholder.svg"}
                  alt={competition.title}
                  width={600}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    <Star className="h-3 w-3 mr-1" />
                    Рекомендуем
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={competition.free ? "secondary" : "destructive"}>
                    {competition.free ? "Бесплатно" : "Платно"}
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
                {competition.fullDescription.split("\n").map(
                  (paragraph, index) =>
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
                      <p className="text-sm text-gray-600">{competition.deadline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Дата проведения</p>
                      <p className="text-sm text-gray-600">{competition.eventDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">Место проведения</p>
                      <p className="text-sm text-gray-600">{competition.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Формат участия</p>
                      <p className="text-sm text-gray-600">{competition.teamSize}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Язык</p>
                      <p className="text-sm text-gray-600">{competition.language}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Подать заявку
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <BookmarkPlus className="h-4 w-4 mr-2" />В избранное
                      </Button>
                      <Button variant="outline" size="sm">
                        <CalendarPlus className="h-4 w-4 mr-2" />В календарь
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
                    <p className="text-sm text-gray-600">{competition.organizer}</p>
                  </div>

                  {competition.website && (
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href={competition.website} target="_blank" rel="noopener noreferrer">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Призы и награды
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {competition.prizes.map((prize, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-700">{prize}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Требования к участникам
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {competition.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Schedule */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                Расписание мероприятия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competition.schedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="text-center min-w-[120px]">
                      <div className="text-sm font-medium text-blue-500">{item.date}</div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Competitions */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Похожие соревнования</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Competition"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">Бесплатно</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    Олимпиада
                  </Badge>
                  <h3 className="font-semibold mb-2">Республиканская олимпиада по физике</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4" />
                    Дедлайн: 28 января 2025
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
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
