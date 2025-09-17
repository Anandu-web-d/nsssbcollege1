"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

export type UserRole = "super_admin" | "admin" | "editor" | "viewer"

export interface Permission {
  resource: string
  actions: string[]
}

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  permissions: Permission[]
  createdAt: string
  lastLogin?: string
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  hasPermission: (resource: string, action: string) => boolean
  canAccess: (requiredRole: UserRole) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Role hierarchy (higher number = more permissions)
const ROLE_HIERARCHY: Record<UserRole, number> = {
  viewer: 1,
  editor: 2,
  admin: 3,
  super_admin: 4,
}

// Default permissions for each role
export const DEFAULT_PERMISSIONS: Record<UserRole, Permission[]> = {
  viewer: [
    { resource: "dashboard", actions: ["read"] },
    { resource: "reports", actions: ["read"] },
    { resource: "activities", actions: ["read"] },
    { resource: "gallery", actions: ["read"] },
    { resource: "team", actions: ["read"] },
    { resource: "achievements", actions: ["read"] },
  ],
  editor: [
    { resource: "dashboard", actions: ["read"] },
    { resource: "reports", actions: ["read", "create", "update"] },
    { resource: "activities", actions: ["read", "create", "update"] },
    { resource: "gallery", actions: ["read", "create", "update", "delete"] },
    { resource: "team", actions: ["read", "update"] },
    { resource: "achievements", actions: ["read", "create", "update"] },
  ],
  admin: [
    { resource: "dashboard", actions: ["read"] },
    { resource: "reports", actions: ["read", "create", "update", "delete"] },
    { resource: "activities", actions: ["read", "create", "update", "delete"] },
    { resource: "gallery", actions: ["read", "create", "update", "delete"] },
    { resource: "team", actions: ["read", "create", "update", "delete"] },
    { resource: "achievements", actions: ["read", "create", "update", "delete"] },
    { resource: "users", actions: ["read", "create", "update"] },
  ],
  super_admin: [
    { resource: "dashboard", actions: ["read"] },
    { resource: "reports", actions: ["read", "create", "update", "delete"] },
    { resource: "activities", actions: ["read", "create", "update", "delete"] },
    { resource: "gallery", actions: ["read", "create", "update", "delete"] },
    { resource: "team", actions: ["read", "create", "update", "delete"] },
    { resource: "achievements", actions: ["read", "create", "update", "delete"] },
    { resource: "users", actions: ["read", "create", "update", "delete"] },
    { resource: "settings", actions: ["read", "create", "update", "delete"] },
    { resource: "system", actions: ["read", "create", "update", "delete"] },
  ],
}

// Mock user credentials with different roles
const MOCK_USERS: Record<string, { password: string; userData: Omit<User, "lastLogin"> }> = {
  anandu: {
    password: "anandu123",
    userData: {
      id: "1",
      username: "anandu",
      email: "anandu@nss.edu",
      role: "super_admin",
      permissions: DEFAULT_PERMISSIONS.super_admin,
      createdAt: "2024-01-01",
      isActive: true,
    },
  },
  admin: {
    password: "admin2024",
    userData: {
      id: "2",
      username: "admin",
      email: "admin@nss.edu",
      role: "admin",
      permissions: DEFAULT_PERMISSIONS.admin,
      createdAt: "2024-01-01",
      isActive: true,
    },
  },
  editor: {
    password: "editor2024",
    userData: {
      id: "3",
      username: "editor",
      email: "editor@nss.edu",
      role: "editor",
      permissions: DEFAULT_PERMISSIONS.editor,
      createdAt: "2024-01-01",
      isActive: true,
    },
  },
  viewer: {
    password: "viewer2024",
    userData: {
      id: "4",
      username: "viewer",
      email: "viewer@nss.edu",
      role: "viewer",
      permissions: DEFAULT_PERMISSIONS.viewer,
      createdAt: "2024-01-01",
      isActive: true,
    },
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("nss_admin_user")
    if (savedUser) {
      try {
        const parsedUser: User = JSON.parse(savedUser)
        // Defensive check: Ensure permissions array exists and is an array
        if (!parsedUser.permissions || !Array.isArray(parsedUser.permissions)) {
          // If permissions are missing or malformed, assign default permissions based on role
          // Fallback to an empty array if the role's default permissions are also undefined (shouldn't happen with current setup)
          parsedUser.permissions = DEFAULT_PERMISSIONS[parsedUser.role] || []
          console.warn(
            `Corrected missing/malformed permissions for user: ${parsedUser.username}. Assigned default permissions for role: ${parsedUser.role}`,
          )
        }
        setUser(parsedUser)
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e)
        localStorage.removeItem("nss_admin_user") // Clear bad data to prevent future errors
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userCredentials = MOCK_USERS[username.toLowerCase()]
    if (userCredentials && userCredentials.password === password) {
      const loggedInUser: User = {
        ...userCredentials.userData,
        lastLogin: new Date().toISOString(),
      }
      setUser(loggedInUser)
      localStorage.setItem("nss_admin_user", JSON.stringify(loggedInUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("nss_admin_user")
  }

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false
    // This check is crucial if localStorage could store a user object without 'permissions'
    if (!user.permissions || !Array.isArray(user.permissions)) {
      console.warn(`User ${user.username} has invalid permissions array. Resource: ${resource}, Action: ${action}`)
      return false
    }

    const permission = user.permissions.find((p) => p.resource === resource)
    return permission ? permission.actions.includes(action) : false
  }

  const canAccess = (requiredRole: UserRole): boolean => {
    if (!user) return false

    return ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY[requiredRole]
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission, canAccess }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Helper function to get role display name
export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case "super_admin":
      return "Super Admin"
    case "admin":
      return "Admin"
    case "editor":
      return "Editor"
    case "viewer":
      return "Viewer"
    default:
      return "Unknown"
  }
}

// Helper function to get role color
export function getRoleColor(role: UserRole): string {
  switch (role) {
    case "super_admin":
      return "bg-red-100 text-red-800"
    case "admin":
      return "bg-blue-100 text-blue-800"
    case "editor":
      return "bg-green-100 text-green-800"
    case "viewer":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

type Admin = {
  username: string
  password: string
}

let admins: Admin[] = [
  { username: "anandu", password: "anandu123" }
]

// Login function
export function login(username: string, password: string): boolean {
  return admins.some(admin => admin.username === username && admin.password === password)
}

// Add admin (only super admin can call this)
export function addAdmin(superUsername: string, newAdmin: Admin): boolean {
  if (superUsername !== "anandu") return false
  if (admins.some(a => a.username === newAdmin.username)) return false
  admins.push(newAdmin)
  return true
}

// Edit admin (only super admin can call this)
export function editAdmin(superUsername: string, username: string, newPassword: string): boolean {
  if (superUsername !== "anandu") return false
  const admin = admins.find(a => a.username === username)
  if (!admin) return false
  admin.password = newPassword
  return true
}
