"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode)

  const handleSuccess = () => {
    onClose()
  }

  const switchToRegister = () => {
    setMode("register")
  }

  const switchToLogin = () => {
    setMode("login")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {mode === "login" ? "Вход в систему" : "Регистрация"}
          </DialogTitle>
        </DialogHeader>
        
        {mode === "login" ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
