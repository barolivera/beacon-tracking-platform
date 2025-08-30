"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, User, Building2, Shield, Hospital, FlaskConical, UserCircle, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
}

const roleIcons = {
  laboratory: FlaskConical,
  regulator: Shield,
  hospital: Hospital,
  patient: UserCircle,
}

const roleColors = {
  laboratory: "bg-blue-100 text-blue-800",
  regulator: "bg-red-100 text-red-800",
  hospital: "bg-green-100 text-green-800",
  patient: "bg-purple-100 text-purple-800",
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth()

  if (!user) return null

  const RoleIcon = roleIcons[user.role]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Image src="/logo.svg" alt="Beacon Logo" width={24} height={24} className="h-6 w-6" />
                <h1 className="text-xl font-bold text-foreground">Beacon</h1>
              </div>
              <Badge className={roleColors[user.role]}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/documentation">
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
              </Link>

              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.name}</span>
                </div>
                {user.organizationName && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Building2 className="h-3 w-3" />
                    <span>{user.organizationName}</span>
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        {children}
      </main>
    </div>
  )
}
