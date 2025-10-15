"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { AuthModal } from "@/components/auth/AuthModal"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  
  const { user, signOut } = useAuth()

  return (
    <>
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
              {/* <Link href="/profile" className="text-gray-700 hover:text-blue-500 font-medium"> */}
                {/* Profile */}
              {/* </Link> */}
              <Link href="/about" className="text-gray-700 hover:text-purple-500 font-medium" prefetch={false}>
                About Us
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">
                    Привет, {user.user_metadata?.full_name || user.email}!
                  </span>
                  <Link href="/profile" prefetch={false}>
                  <Button variant="outline" size="sm">
                    Profile
                  </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setAuthMode("login")
                      setAuthModalOpen(true)
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                    onClick={() => {
                      setAuthMode("register")
                      setAuthModalOpen(true)
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  )
}
