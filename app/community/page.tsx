import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/Header"
import { ExternalLink, Users, MessageCircle, Hash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const communities = [
  {
    name: "Extrasabaq Community",
    platform: "Discord",
    members: "2,847 участников",
    description: "Основной сервер для общения участников, поиска команд и обсуждения соревнований",
    color: "bg-yellow-500",
    icon: MessageCircle,
    link: "https://discord.gg/extrasabaq",
  },
  {
    name: "Хакатоны и IT",
    platform: "Discord",
    members: "1,203 участника",
    description: "Специализированный канал для обсуждения технических соревнований и хакатонов",
    color: "bg-green-500",
    icon: Hash,
    link: "https://discord.gg/hackathons",
  },
  {
    name: "Олимпиады по математике",
    platform: "Telegram",
    members: "3,456 участников",
    description: "Канал для обсуждения математических олимпиад и решения задач",
    color: "bg-blue-500",
    icon: MessageCircle,
    link: "https://t.me/math_olympiads",
  },
  {
    name: "Стартап сообщество",
    platform: "Discord",
    members: "892 участника",
    description: "Место для обсуждения бизнес-идей и поиска команды для стартап конкурсов",
    color: "bg-purple-500",
    icon: Hash,
    link: "https://discord.gg/startups",
  },
  {
    name: "Дебаты и MUN",
    platform: "WhatsApp",
    members: "567 участников",
    description: "Группа для участников дебатов и модели ООН",
    color: "bg-pink-500",
    icon: MessageCircle,
    link: "https://chat.whatsapp.com/debates",
  },
  {
    name: "Творческие конкурсы",
    platform: "Telegram",
    members: "1,234 участника",
    description: "Канал для обсуждения конкурсов по искусству, эссе и творческих проектов",
    color: "bg-orange-500",
    icon: MessageCircle,
    link: "https://t.me/creative_contests",
  },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Сообщество Extrasabaq</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Присоединяйся к нашим сообществам для общения с единомышленниками, поиска команды и получения актуальной
            информации о соревнованиях
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-yellow-500 mb-2">15,000+</div>
                <p className="text-gray-600">Участников в сообществах</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-gradient-to-br from-pink-50 to-red-50 border-pink-200">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-pink-500 mb-2">500+</div>
                <p className="text-gray-600">Команд сформировано</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-green-500 mb-2">50+</div>
                <p className="text-gray-600">Активных чатов</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Наши сообщества</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {communities.map((community, index) => {
              const Icon = community.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`${community.color} rounded-full w-12 h-12 flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{community.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{community.platform}</Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {community.members}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">{community.description}</CardDescription>
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white"
                      asChild
                    >
                      <a href={community.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Присоединиться
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Правила сообщества</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    Что приветствуется
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Взаимопомощь и поддержка</li>
                    <li>• Обмен полезной информацией</li>
                    <li>• Конструктивные обсуждения</li>
                    <li>• Поиск команды для соревнований</li>
                    <li>• Вопросы о соревнованиях</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✗</span>
                    </div>
                    Что запрещено
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Спам и реклама</li>
                    <li>• Оскорбления и токсичность</li>
                    <li>• Обман и мошенничество</li>
                    <li>• Нарушение авторских прав</li>
                    <li>• Политические дискуссии</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
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
