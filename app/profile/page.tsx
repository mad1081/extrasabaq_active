"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { AuthModal } from "@/components/auth/AuthModal"
import { Calendar, Star, Upload, Award, BookOpen, Settings, Edit, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProfilePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [favorites, setFavorites] = useState([])
  const [calendarEvents, setCalendarEvents] = useState([])
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const { user, signOut, loading: authLoading } = useAuth()

  useEffect(() => {
    if (user) {
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      // Fetch user profile, favorites and calendar events
      const [profileResponse, favoritesResponse, calendarResponse] = await Promise.all([
        fetch(`/api/user/profile?userId=${user?.id}`),
        fetch(`/api/user/favorites?userId=${user?.id}`),
        fetch(`/api/user/calendar?userId=${user?.id}`)
      ])

      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setUserProfile(profileData.user)
      }

      if (favoritesResponse.ok) {
        const favoritesData = await favoritesResponse.json()
        setFavorites(favoritesData.favorites || [])
      }

      if (calendarResponse.ok) {
        const calendarData = await calendarResponse.json()
        setCalendarEvents(calendarData.calendar || [])
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    // Redirect to home page
    window.location.href = '/'
  }

  // Show login form if user is not authenticated
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Войдите в систему</h1>
          <p className="text-gray-600 mb-6">Для просмотра профиля необходимо войти в аккаунт</p>
          <div className="space-x-4">
            <Button 
              onClick={() => {
                setAuthMode("login")
                setAuthModalOpen(true)
              }}
            >
              Войти
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setAuthMode("register")
                setAuthModalOpen(true)
              }}
            >
              Зарегистрироваться
            </Button>
          </div>
          <AuthModal 
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            defaultMode={authMode}
          />
        </div>
      </div>
    )
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
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
              <Link href="/profile" className="text-blue-500 font-medium" prefetch={false}>
                Profile
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-500 font-medium" prefetch={false}>
                About Us
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Привет, {user?.user_metadata?.full_name || user?.email}!
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-2xl">
                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {userProfile?.full_name || "Пользователь"}
                  </h1>
                  <p className="text-gray-600 mb-2">@{userProfile?.username || "username"}</p>
                  <p className="text-gray-500 mb-2">{userProfile?.email || user?.email}</p>
                  
                  {/* Additional Profile Information */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    {userProfile?.grade && (
                      <span>{userProfile.grade} класс</span>
                    )}
                    {userProfile?.city && (
                      <span>• {userProfile.city}</span>
                    )}
                    {userProfile?.school && (
                      <span>• {userProfile.school}</span>
                    )}
                  </div>
                  
                  {/* Interests */}
                  {userProfile?.interests && userProfile.interests.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {userProfile.interests.map((interest: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center space-x-4 mt-4">
                    <Badge variant="outline">
                      <Star className="h-3 w-3 mr-1" />
                      {favorites.length} избранных
                    </Badge>
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      {calendarEvents.length} событий
                    </Badge>
                  </div>
                </div>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Редактировать
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="favorites" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="favorites">
                <Star className="h-4 w-4 mr-2" />
                Избранные
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Календарь
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Award className="h-4 w-4 mr-2" />
                Достижения
              </TabsTrigger>
            </TabsList>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Избранные соревнования</h2>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Добавить достижение
                  </Button>
                </div>
                
                {favorites.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Нет избранных соревнований
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Добавьте соревнования в избранное, чтобы они отображались здесь
                    </p>
                    <Link href="/">
                      <Button>Найти соревнования</Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {favorites.map((favorite: any) => (
                      <Card key={favorite.id} className="hover:shadow-lg transition-shadow">
                        <div className="flex">
                          <div className="relative w-48">
                            <Image
                              src={favorite.competitions?.image_url || "/placeholder.svg"}
                              alt={favorite.competitions?.title}
                              width={200}
                              height={150}
                              className="w-full h-32 object-cover rounded-l-lg"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <Badge variant="outline" className="mb-2">
                                  {favorite.competitions?.category}
                                </Badge>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                  {favorite.competitions?.title}
                                </h3>
                                <p className="text-gray-600 mb-3 line-clamp-2">
                                  {favorite.competitions?.description}
                                </p>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Дедлайн: {new Date(favorite.competitions?.deadline).toLocaleDateString('ru-RU')}
                                </div>
                              </div>
                              <div className="flex flex-col space-y-2">
                                <Link href={`/competition/${favorite.competitions?.id}`}>
                                  <Button size="sm">Подробнее</Button>
                                </Link>
                                <Button variant="outline" size="sm">
                                  Удалить из избранного
                                </Button>
                              </div>
                            </div>
                        </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                  </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Календарь событий</h2>
                
                {calendarEvents.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Нет запланированных событий
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Добавьте соревнования в календарь, чтобы не пропустить важные даты
                    </p>
                    <Link href="/">
                      <Button>Найти соревнования</Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {calendarEvents.map((event: any) => (
                      <Card key={event.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-center min-w-[100px]">
                                <div className="text-sm font-medium text-blue-500">
                                  {new Date(event.competitions?.deadline).toLocaleDateString('ru-RU')}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {new Date(event.competitions?.deadline).toLocaleTimeString('ru-RU', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800">
                                  {event.competitions?.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {event.competitions?.description}
                                </p>
                                {event.notes && (
                                  <p className="text-sm text-blue-600 mt-1">
                                    Заметка: {event.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Link href={`/competition/${event.competitions?.id}`}>
                                <Button size="sm" variant="outline">Подробнее</Button>
                              </Link>
                              <Button size="sm" variant="outline">
                                Удалить из календаря
                          </Button>
                        </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Мои достижения</h2>
                        <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Загрузить документ
                        </Button>
                      </div>
                
                <Card className="p-8 text-center">
                  <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Пока нет загруженных достижений
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Загружайте дипломы, сертификаты и другие документы о ваших достижениях
                  </p>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                    Загрузить первое достижение
                    </Button>
              </Card>
                  </div>
            </TabsContent>
          </Tabs>
          </div>
        </div>
    </div>
  )
}