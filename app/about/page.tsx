import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Target, Lightbulb, Heart, Mail, Linkedin, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const teamMembers = [
  {
    name: "Ясмин",
    role: "Лидер команды",
    description: "Координатор работы над проектом, обеспечивает слаженную работу всей команды",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
    email: "yasmin@extrasabaq.com",
  },
  {
    name: "Раушан",
    role: "Главный разработчик",
    description: "Главный разработчик платформы, отвечает за техническую реализацию проекта",
    image: "/placeholder.svg?height=200&width=200",
    github: "#",
    email: "raushan@extrasabaq.com",
  },
  {
    name: "Аяулым",
    role: "Главный дизайнер",
    description: "Главный дизайнер проекта, занимается сбором информации о соревнованиях",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
    email: "ayaulym@extrasabaq.com",
  },
  {
    name: "Асем",
    role: "Контент-менеджер",
    description: "Сбор данных и оформление постов на сайте, работа с контентом платформы",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
    email: "asem@extrasabaq.com",
  },
  {
    name: "Софья",
    role: "SMM-специалист",
    description: "SMM-специалист проекта, помощник разработки платформы и продвижения",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
    email: "sofya@extrasabaq.com",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">О проекте Extrasabaq</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создаем платформу, которая объединяет талантливых школьников с лучшими образовательными возможностями по
            всему миру
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Наша миссия</h3>
                <p className="text-gray-600">
                  Сделать высококачественные образовательные соревнования доступными каждому школьнику, независимо от
                  местонахождения
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Наше видение</h3>
                <p className="text-gray-600">
                  Создать глобальную экосистему, где таланты встречаются с возможностями для развития и самореализации
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-pink-50 to-red-50 border-pink-200">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Наши ценности</h3>
                <p className="text-gray-600">
                  Равенство возможностей, качественное образование, поддержка сообщества и непрерывное развитие
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project History */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">История проекта</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Extrasabaq родился из личного опыта наших основателей. Будучи школьниками из регионов, мы часто
              сталкивались с трудностями в поиске качественных образовательных соревнований. Информация была
              разрозненной, многие возможности оставались неизвестными.
            </p>
            <br />
            <p className="text-lg text-gray-600 leading-relaxed">
              В 2024 году мы решили изменить эту ситуацию, создав единую платформу, которая объединяет все
              образовательные возможности в одном месте. Наша цель - сделать так, чтобы каждый талантливый школьник мог
              найти свой путь к успеху, независимо от того, где он живет.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Наша команда</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-purple-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-6">{member.description}</p>
                  <div className="flex justify-center gap-4">
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    {member.linkedin && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.github && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Свяжитесь с нами</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Есть вопросы, предложения или хотите стать партнером? Мы всегда открыты для общения!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Mail className="h-5 w-5 mr-2" />
              info@extrasabaq.com
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-purple-500"
            >
              Написать нам
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
