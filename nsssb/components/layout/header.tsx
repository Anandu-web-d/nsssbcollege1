"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Settings } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Activities", href: "/activities" },
    { name: "Gallery", href: "/gallery" },
    { name: "Achievements", href: "/achievements" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/placeholder.svg?height=40&width=40&text=NSS+Logo"
                alt="NSS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800">NSS</span>
              <span className="text-xs text-gray-600">SB College</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {/* Admin Link */}
            {user ? (
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            ) : (
              <Link href="/admin/login">
                <Button variant="outline" size="sm" className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t pt-4">
                  {user ? (
                    <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full bg-blue-50 border-blue-200 text-blue-700">
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Panel
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full bg-gray-50 border-gray-200 text-gray-700">
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
