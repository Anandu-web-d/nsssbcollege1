"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Calendar, MapPin, Users, ArrowLeft, Upload, FileText, ImageIcon } from 'lucide-react'
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import type { Activity } from "@/lib/data-store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import PermissionGuard from "@/components/admin/permission-guard"

export default function AdminActivitiesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activities, setActivities] = useState<Activity[]>([])
  const [isAddingActivity, setIsAddingActivity] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [formData, setFormData] = useState<Partial<Activity>>({
    title: "",
    date: "",
    location: "",
    participants: 0,
    description: "",
    category: "Health",
    month: "",
    year: "2024",
    images: [],
  })
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  // fixed: correct destructuring for useState
  const [uploadedPDF, setUploadedPDF] = useState<string>("")

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
      return
    }
    loadActivities()
  }, [user, router])

  const loadActivities = async () => {
    try {
      const res = await fetch("/api/activities", { cache: "no-store" })
      const data: Activity[] = await res.json()
      setActivities(data)
    } catch (e) {
      console.error("Failed to load activities", e)
      setActivities([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const activityData = {
      ...formData,
      images: uploadedImages,
      pdfUrl: uploadedPDF,
    } as Omit<Activity, "id">

    try {
      if (editingActivity) {
        await fetch(`/api/activities/${editingActivity.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activityData),
        })
      } else {
        await fetch("/api/activities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activityData),
        })
      }
    } catch (e) {
      console.error("Failed to save activity", e)
    }
    resetForm()
    loadActivities()
  }

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity)
    setFormData(activity)
    setUploadedImages(activity.images || [])
    setIsAddingActivity(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this activity?")) return
    try {
      await fetch(`/api/activities/${id}`, { method: "DELETE" })
      loadActivities()
    } catch (e) {
      console.error("Failed to delete activity", e)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      location: "",
      participants: 0,
      description: "",
      category: "Health",
      month: "",
      year: "2024",
      images: [],
    })
    setUploadedImages([])
    setUploadedPDF("")
    setEditingActivity(null)
    setIsAddingActivity(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          setUploadedImages((prev) => [...prev, imageUrl])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedPDF(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Health":
        return "bg-red-100 text-red-800"
      case "Education":
        return "bg-blue-100 text-blue-800"
      case "Environment":
        return "bg-green-100 text-green-800"
      case "Social Welfare":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const sortedActivities = [...activities].sort((a, b) => {
    // Prioritize by date, fallback to year and month if date is missing
    const dateA = new Date(a.date || `${a.year}-${a.month}`)
    const dateB = new Date(b.date || `${b.year}-${b.month}`)
    return dateB.getTime() - dateA.getTime()
  })

  // For display, group by year and month
  const grouped = sortedActivities.reduce((acc, activity) => {
    const year = activity.year
    const month = activity.month
    if (!acc[year]) acc[year] = {}
    if (!acc[year][month]) acc[year][month] = []
    acc[year][month].push(activity)
    return acc
  }, {} as Record<string, Record<string, Activity[]>>)

  if (!user) return <div>Loading...</div>

  return (
    <PermissionGuard resource="activities" action="read">
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
                <h1 className="text-2xl font-bold text-gray-800">Manage Activities</h1>
                <p className="text-gray-600">Add, edit, or remove NSS activities</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Add Activity Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Activities ({activities.length})</h2>
              <p className="text-gray-600">Manage all NSS activities and events</p>
            </div>

            {/* Wrap trigger + content in same Dialog (keeps controlled open state) */}
            <PermissionGuard resource="activities" action="create">
              <Dialog open={isAddingActivity} onOpenChange={setIsAddingActivity}>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsAddingActivity(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Activity
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingActivity ? "Edit Activity" : "Add New Activity"}</DialogTitle>
                    <DialogDescription>Fill in the details for the activity</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Activity Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="participants">Number of Participants</Label>
                        <Input
                          id="participants"
                          type="number"
                          value={formData.participants}
                          onChange={(e) => setFormData((prev) => ({ ...prev, participants: Number.parseInt(e.target.value) || 0 }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as Activity["category"] }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Health">Health</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Environment">Environment</SelectItem>
                            <SelectItem value="Social Welfare">Social Welfare</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="month">Month</Label>
                        <Input
                          id="month"
                          value={formData.month}
                          onChange={(e) => setFormData((prev) => ({ ...prev, month: e.target.value }))}
                          placeholder="e.g., January"
                          required
                        />
                      </div>
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
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the activity..."
                        rows={3}
                        required
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <Label htmlFor="images">Activity Photos</Label>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {uploadedImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Activity image ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                onClick={() => removeImage(index)}
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* PDF Upload */}
                    <div>
                      <Label htmlFor="pdf">Activity Report (PDF)</Label>
                      <Input
                        id="pdf"
                        type="file"
                        accept=".pdf"
                        onChange={handlePDFUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                      />
                      {uploadedPDF && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                          <FileText className="w-4 h-4" />
                          PDF uploaded successfully
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">{editingActivity ? "Update" : "Add"} Activity</Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </PermissionGuard>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getCategoryColor(activity.category)}>{activity.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {activity.participants}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      {activity.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      {activity.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>

                  {/* Media indicators */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    {activity.images && activity.images.length > 0 && (
                      <div className="flex items-center gap-1">
                        <ImageIcon className="w-4 h-4" />
                        <span>{activity.images.length} photos</span>
                      </div>
                    )}
                    {(activity as any).pdfUrl && (
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>PDF report</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <PermissionGuard resource="activities" action="update">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(activity)} className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </PermissionGuard>
                    <PermissionGuard resource="activities" action="delete">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(activity.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </PermissionGuard>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {activities.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Activities Yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first activity</p>
              <Button onClick={() => setIsAddingActivity(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Activity
              </Button>
            </div>
          )}

          {/* Grouped Activities by Year and Month */}
          <div className="mt-8">
            {Object.keys(grouped).sort((a, b) => Number(b) - Number(a)).map(year => (
              <div key={year}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{year}</h2>
                {["January","February","March","April","May","June","July","August","September","October","November","December"].map(month => (
                  <div key={month}>
                    <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">{month}</h3>
                    {(grouped[year][month] || []).map(activity => (
                      <Card key={activity.id} className="hover:shadow-lg transition-shadow mb-4">
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={getCategoryColor(activity.category)}>{activity.category}</Badge>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {activity.participants}
                            </span>
                          </div>
                          <CardTitle className="text-xl">{activity.title}</CardTitle>
                          <CardDescription className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4" />
                              {activity.date}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4" />
                              {activity.location}
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>

                          {/* Media indicators */}
                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                            {activity.images && activity.images.length > 0 && (
                              <div className="flex items-center gap-1">
                                <ImageIcon className="w-4 h-4" />
                                <span>{activity.images.length} photos</span>
                              </div>
                            )}
                            {(activity as any).pdfUrl && (
                              <div className="flex items-center gap-1">
                                <FileText className="w-4 h-4" />
                                <span>PDF report</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <PermissionGuard resource="activities" action="update">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(activity)} className="flex-1">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                            </PermissionGuard>
                            <PermissionGuard resource="activities" action="delete">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(activity.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </PermissionGuard>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}
