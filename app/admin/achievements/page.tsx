"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, ArrowLeft, Trophy, Award, Medal, Star } from 'lucide-react'
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { dataStore, type Achievement } from "@/lib/data-store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import PermissionGuard from "@/components/admin/permission-guard"

export default function AdminAchievementsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isAddingAchievement, setIsAddingAchievement] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)
  const [formData, setFormData] = useState<Partial<Achievement>>({
    title: "",
    year: new Date().getFullYear().toString(),
    level: "State Level",
    description: "",
    category: "award",
    icon: "trophy",
    color: "text-yellow-600",
  })

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
      return
    }
    loadAchievements()
  }, [user, router])

  const loadAchievements = () => {
    setAchievements(dataStore.getAchievements())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingAchievement) {
      dataStore.updateAchievement(editingAchievement.id, formData)
    } else {
      dataStore.addAchievement(formData as Omit<Achievement, "id">)
    }
    resetForm()
    loadAchievements()
  }

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement)
    setFormData(achievement)
    setIsAddingAchievement(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      dataStore.deleteAchievement(id)
      loadAchievements()
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      year: new Date().getFullYear().toString(),
      level: "State Level",
      description: "",
      category: "award",
      icon: "trophy",
      color: "text-yellow-600",
    })
    setEditingAchievement(null)
    setIsAddingAchievement(false)
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return Trophy
      case "award":
        return Award
      case "medal":
        return Medal
      case "star":
        return Star
      default:
        return Trophy
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "National Level":
        return "bg-red-100 text-red-800"
      case "State Level":
        return "bg-blue-100 text-blue-800"
      case "Regional Level":
        return "bg-green-100 text-green-800"
      case "District Level":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <PermissionGuard resource="achievements" action="read">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Manage Achievements</h1>
                <p className="text-gray-600">Add, edit, or remove NSS awards and recognitions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Add Achievement Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Achievements ({achievements.length})</h2>
              <p className="text-gray-600">Awards and recognitions received by NSS</p>
            </div>

            {/* Wrapped DialogTrigger and DialogContent inside a Dialog */}
            <PermissionGuard resource="achievements" action="create">
              <Dialog open={isAddingAchievement} onOpenChange={setIsAddingAchievement}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Achievement
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingAchievement ? "Edit Achievement" : "Add New Achievement"}</DialogTitle>
                    <DialogDescription>Fill in the details for the achievement</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Achievement Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Best NSS Unit Award"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="year">Year</Label>
                        <Input
                          id="year"
                          value={formData.year}
                          onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                          placeholder="e.g., 2024"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="level">Level</Label>
                        <Select value={formData.level} onValueChange={(value) => setFormData((prev) => ({ ...prev, level: value as Achievement["level"] }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="National Level">National Level</SelectItem>
                            <SelectItem value="State Level">State Level</SelectItem>
                            <SelectItem value="Regional Level">Regional Level</SelectItem>
                            <SelectItem value="District Level">District Level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as Achievement["category"] }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="award">Award</SelectItem>
                            <SelectItem value="recognition">Recognition</SelectItem>
                            <SelectItem value="milestone">Milestone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="icon">Icon</Label>
                        <Select value={formData.icon} onValueChange={(value) => setFormData((prev) => ({ ...prev, icon: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trophy">Trophy</SelectItem>
                            <SelectItem value="award">Award</SelectItem>
                            <SelectItem value="medal">Medal</SelectItem>
                            <SelectItem value="star">Star</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="color">Icon Color</Label>
                      <Select value={formData.color} onValueChange={(value) => setFormData((prev) => ({ ...prev, color: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text-yellow-600">Gold</SelectItem>
                          <SelectItem value="text-blue-600">Blue</SelectItem>
                          <SelectItem value="text-green-600">Green</SelectItem>
                          <SelectItem value="text-red-600">Red</SelectItem>
                          <SelectItem value="text-purple-600">Purple</SelectItem>
                          <SelectItem value="text-orange-600">Orange</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the achievement..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">{editingAchievement ? "Update" : "Add"} Achievement</Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </PermissionGuard>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const IconComponent = getIconComponent(achievement.icon)
              return (
                <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className={`w-8 h-8 ${achievement.color}`} />
                      <Badge variant="outline">{achievement.year}</Badge>
                    </div>
                    <CardTitle className="text-xl">{achievement.title}</CardTitle>
                    <CardDescription>
                      <Badge className={getLevelColor(achievement.level)}>{achievement.level}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">{achievement.description}</p>
                    <div className="flex gap-2">
                      <PermissionGuard resource="achievements" action="update">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(achievement)} className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </PermissionGuard>
                      <PermissionGuard resource="achievements" action="delete">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(achievement.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </PermissionGuard>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {achievements.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Achievements Yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first achievement</p>
              <Button onClick={() => setIsAddingAchievement(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Achievement
              </Button>
            </div>
          )}
        </div>
      </div>
    </PermissionGuard>
  )
}
