"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Award, Image, FileText, Settings, BarChart3, Activity, LogOut, Shield } from 'lucide-react'
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { dataStore } from "@/lib/data-store"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PermissionGuard from "@/components/admin/permission-guard"
import RoleBadge from "@/components/admin/role-badge"

export default function AdminDashboard() {
  const { user, logout, hasPermission } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    teamMembers: 0,
    activities: 0,
    achievements: 0,
    galleryImages: 0,
    reports: 0,
  })

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
      return
    }

    // Load statistics
    setStats({
      teamMembers: dataStore.getTeamMembers().length,
      activities: dataStore.getActivities().length,
      achievements: dataStore.getAchievements().length,
      galleryImages: dataStore.getGalleryImages().length,
      reports: dataStore.getReports().length,
    })
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const quickActions = [
    {
      title: "Manage Team Members",
      description: "Add, edit, or remove core team members",
      icon: Users,
      href: "/admin/team",
      color: "bg-blue-500",
      count: stats.teamMembers,
      resource: "team",
      action: "read",
    },
    {
      title: "Manage Activities",
      description: "Add new activities and manage existing ones",
      icon: Calendar,
      href: "/admin/activities",
      color: "bg-green-500",
      count: stats.activities,
      resource: "activities",
      action: "read",
    },
    {
      title: "Manage Achievements",
      description: "Add awards and recognitions",
      icon: Award,
      href: "/admin/achievements",
      color: "bg-yellow-500",
      count: stats.achievements,
      resource: "achievements",
      action: "read",
    },
    {
      title: "Manage Gallery",
      description: "Upload and organize photos",
      icon: Image,
      href: "/admin/gallery",
      color: "bg-purple-500",
      count: stats.galleryImages,
      resource: "gallery",
      action: "read",
    },
    {
      title: "Manage Reports",
      description: "Upload monthly reports and documents",
      icon: FileText,
      href: "/admin/reports",
      color: "bg-red-500",
      count: stats.reports,
      resource: "reports",
      action: "read",
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Shield,
      href: "/admin/users",
      color: "bg-indigo-500",
      count: null,
      resource: "users",
      action: "read",
    },
    {
      title: "Website Settings",
      description: "Configure website settings and preferences",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-gray-500",
      count: null,
      resource: "settings",
      action: "read",
    },
  ]

  const accessibleActions = quickActions.filter(action => 
    hasPermission(action.resource, action.action)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=40&width=40&text=NSS+Logo"
                  alt="NSS Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">NSS Admin Dashboard</h1>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600">Welcome back, {user.username}</p>
                  <RoleBadge role={user.role} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" target="_blank">
                <Button variant="outline">View Website</Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:text-red-700">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.teamMembers}</div>
              <p className="text-xs text-muted-foreground">Core team members</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activities}</div>
              <p className="text-xs text-muted-foreground">Organized activities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.achievements}</div>
              <p className="text-xs text-muted-foreground">Awards & recognitions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.galleryImages}</div>
              <p className="text-xs text-muted-foreground">Photos uploaded</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessibleActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <Link href={action.href}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg ${action.color} text-white`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        {action.count !== null && (
                          <Badge variant="secondary" className="text-sm">
                            {action.count}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>

        {/* User Permissions Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Your Permissions
            </CardTitle>
            <CardDescription>Overview of your current access levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.permissions.map((permission, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium capitalize">{permission.resource}</h4>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {permission.actions.map((action, actionIndex) => (
                      <Badge key={actionIndex} variant="outline" className="text-xs">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
