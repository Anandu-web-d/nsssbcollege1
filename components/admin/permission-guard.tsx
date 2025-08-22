"use client"

import { useAuth, type UserRole } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PermissionGuardProps {
  children: React.ReactNode
  resource?: string
  action?: string
  role?: UserRole
  fallback?: React.ReactNode
}

export default function PermissionGuard({ 
  children, 
  resource, 
  action, 
  role, 
  fallback 
}: PermissionGuardProps) {
  const { user, hasPermission, canAccess } = useAuth()

  if (!user) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <Lock className="h-4 w-4" />
        <AlertDescription>
          You must be logged in to access this content.
          <Link href="/admin/login" className="ml-2">
            <Button variant="outline" size="sm">Login</Button>
          </Link>
        </AlertDescription>
      </Alert>
    )
  }

  // Check role-based access
  if (role && !canAccess(role)) {
    return fallback || (
      <Alert className="border-orange-200 bg-orange-50">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          You don't have sufficient permissions to access this content. 
          Required role: <strong>{role}</strong>, Your role: <strong>{user.role}</strong>
        </AlertDescription>
      </Alert>
    )
  }

  // Check resource and action-based access
  if (resource && action && !hasPermission(resource, action)) {
    return fallback || (
      <Alert className="border-orange-200 bg-orange-50">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          You don't have permission to {action} {resource}. 
          Contact your administrator for access.
        </AlertDescription>
      </Alert>
    )
  }

  return <div>{children}</div>
}
