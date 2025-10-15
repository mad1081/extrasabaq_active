"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/useAuth"
import { Loader2, Eye, EyeOff } from "lucide-react"

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

const subjects = [
  "Math",
  "Chemistry", 
  "Comp Sci",
  "History",
  "Music",
  "Physics",
  "Biology",
  "Literature",
  "Art & Design",
  "Foreign languages"
]

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
    grade: "",
    city: "",
    school: "",
    interests: [] as string[],
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { signUp } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleInterestChange = (subject: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, subject]
        : prev.interests.filter(interest => interest !== subject)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      setLoading(false)
      return
    }

    const { error, data } = await signUp(
      formData.email,
      formData.password,
      formData.fullName,
      formData.username,
      formData.grade ? parseInt(formData.grade) : undefined,
      formData.city || undefined,
      formData.school || undefined,
      formData.interests.length > 0 ? formData.interests : undefined
    )
    
    if (error) {
      setError(error.message)
    } else if (data?.user) {
      // Save user data to the users table
      try {
        const dbResponse = await fetch('/api/user/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: data.user.id,
            email: formData.email,
            fullName: formData.fullName,
            username: formData.username,
            grade: formData.grade ? parseInt(formData.grade) : null,
            city: formData.city || null,
            school: formData.school || null,
            interests: formData.interests.length > 0 ? formData.interests : null
          })
        })
        
        if (!dbResponse.ok) {
          const dbError = await dbResponse.json()
          console.error('Database save failed:', dbError)
          // Still proceed with success since auth worked
        } else {
          console.log('User data saved to database successfully')
        }
      } catch (dbError) {
        console.error('Failed to save user data to database:', dbError)
        // Don't show error to user as auth was successful
      }
      
      setError(null)
      onSuccess?.()
    }
    
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
        <CardDescription>
          Заполните форму для регистрации в системе
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[70vh] overflow-y-auto pr-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Имя</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Иван"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="ivan_dev"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Класс</Label>
              <Input
                id="grade"
                name="grade"
                type="number"
                placeholder="11"
                min="1"
                max="12"
                value={formData.grade}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Город</Label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder="Алматы"
                value={formData.city}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">Школа</Label>
            <Input
              id="school"
              name="school"
              type="text"
              placeholder="НИШ ХБН г. Алматы"
              value={formData.school}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="space-y-3">
            <Label>Интересующие предметы</Label>
            <div className="grid grid-cols-2 gap-3">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={subject}
                    checked={formData.interests.includes(subject)}
                    onCheckedChange={(checked) => handleInterestChange(subject, checked as boolean)}
                    disabled={loading}
                  />
                  <Label
                    htmlFor={subject}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {subject}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Минимум 6 символов"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Повторите пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Зарегистрироваться
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Уже есть аккаунт? </span>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={onSwitchToLogin}
            disabled={loading}
          >
            Войти
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
