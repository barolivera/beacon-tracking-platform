export type UserRole = "laboratory" | "regulator" | "hospital" | "patient"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId?: string
  organizationName?: string
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock authentication service for simulation
export class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(email: string, password: string): Promise<User> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on email domain
    const mockUser = this.getMockUserByEmail(email)
    if (!mockUser) {
      throw new Error("Invalid credentials")
    }

    this.currentUser = mockUser
    localStorage.setItem("auth_user", JSON.stringify(mockUser))
    return mockUser
  }

  async logout(): Promise<void> {
    this.currentUser = null
    localStorage.removeItem("auth_user")
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser

    const stored = localStorage.getItem("auth_user")
    if (stored) {
      this.currentUser = JSON.parse(stored)
      return this.currentUser
    }

    return null
  }

  private getMockUserByEmail(email: string): User | null {
    const mockUsers: Record<string, User> = {
      "lab@pharmatech.com": {
        id: "1",
        email: "lab@pharmatech.com",
        name: "Dr. Sarah Chen",
        role: "laboratory",
        organizationId: "lab-001",
        organizationName: "PharmaTech Labs",
        isActive: true,
        createdAt: new Date("2024-01-15"),
        lastLogin: new Date(),
      },
      "regulator@anmat.gov": {
        id: "2",
        email: "regulator@anmat.gov",
        name: "Carlos Rodriguez",
        role: "regulator",
        organizationId: "anmat-001",
        organizationName: "ANMAT - Regulatory Authority",
        isActive: true,
        createdAt: new Date("2024-01-10"),
        lastLogin: new Date(),
      },
      "hospital@medcenter.com": {
        id: "3",
        email: "hospital@medcenter.com",
        name: "Dr. Maria Santos",
        role: "hospital",
        organizationId: "hosp-001",
        organizationName: "Central Medical Center",
        isActive: true,
        createdAt: new Date("2024-01-20"),
        lastLogin: new Date(),
      },
      "patient@email.com": {
        id: "4",
        email: "patient@email.com",
        name: "John Patient",
        role: "patient",
        isActive: true,
        createdAt: new Date("2024-02-01"),
        lastLogin: new Date(),
      },
    }

    return mockUsers[email] || null
  }
}

export const authService = AuthService.getInstance()
