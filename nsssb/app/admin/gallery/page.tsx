"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, ArrowLeft, Upload, ImageIcon, Calendar } from 'lucide-react'
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { dataStore, type GalleryImage } from "@/lib/data-store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import PermissionGuard from "@/components/admin/permission-guard"

export default function AdminGalleryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isAddingImage, setIsAddingImage] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    src: "",
    alt: "",
    title: "",
    category: "Health",
    date: "",
    activityId: "",
  })
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [filterCategory, setFilterCategory] = useState<string>("all")

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
      return
    }
    loadGalleryImages()
  }, [user, router])

  const loadGalleryImages = () => {
    setGalleryImages(dataStore.getGalleryImages())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // If multiple images are selected, create multiple entries
    if (selectedImages.length > 0) {
      selectedImages.forEach((imageSrc, index) => {
        const imageData = {
          ...formData,
          src: imageSrc,
          alt: formData.alt || `${formData.title} - Image ${index + 1}`,
        } as Omit<GalleryImage, "id">

        if (editingImage && index === 0) {
          dataStore.updateGalleryImage(editingImage.id, imageData)
        } else {
          dataStore.addGalleryImage(imageData)
        }
      })
    }
    
    resetForm()
    loadGalleryImages()
  }

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image)
    setFormData(image)
    setSelectedImages([image.src])
    setIsAddingImage(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      dataStore.deleteGalleryImage(id)
      loadGalleryImages()
    }
  }

  const resetForm = () => {
    setFormData({
      src: "",
      alt: "",
      title: "",
      category: "Health",
      date: "",
      activityId: "",
    })
    setSelectedImages([])
    setEditingImage(null)
    setIsAddingImage(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages: string[] = []

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          newImages.push(imageUrl)
          if (newImages.length === files.length) {
            setSelectedImages(newImages)
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
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

  const filteredImages = filterCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === filterCategory)

  if (!user) return <div>Loading...</div>

  return (
    <PermissionGuard resource="gallery" action="read">
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
                <h1 className="text-2xl font-bold text-gray-800">Manage Gallery</h1>
                <p className="text-gray-600">Upload and organize NSS activity photos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Gallery Images ({filteredImages.length})</h2>
              <p className="text-gray-600">Manage photos from NSS activities</p>
            </div>
            
            <div className="flex gap-4">
              {/* Category Filter */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Environment">Environment</SelectItem>
                  <SelectItem value="Social Welfare">Social Welfare</SelectItem>
                </SelectContent>
              </Select>

              {/* Add Image Button */}
              <Dialog open={isAddingImage} onOpenChange={setIsAddingImage}>
                <PermissionGuard resource="gallery" action="create">
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsAddingImage(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Images
                    </Button>
                  </DialogTrigger>
                </PermissionGuard>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingImage ? "Edit Image" : "Add New Images"}</DialogTitle>
                    <DialogDescription>Upload and organize activity photos</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Image Upload */}
                    <div>
                      <Label htmlFor="images">Select Images</Label>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple={!editingImage}
                        onChange={handleImageUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        required={!editingImage}
                      />
                      {selectedImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Selected image ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Image Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., Blood Donation Camp - January 2024"
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
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as GalleryImage["category"] }))}>
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
                        <Label htmlFor="activityId">Activity ID (Optional)</Label>
                        <Input
                          id="activityId"
                          value={formData.activityId}
                          onChange={(e) => setFormData((prev) => ({ ...prev, activityId: e.target.value }))}
                          placeholder="Link to specific activity"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="alt">Alt Text</Label>
                      <Input
                        id="alt"
                        value={formData.alt}
                        onChange={(e) => setFormData((prev) => ({ ...prev, alt: e.target.value }))}
                        placeholder="Describe the image for accessibility"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">{editingImage ? "Update" : "Add"} Images</Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className={getCategoryColor(image.category)}>{image.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1 text-sm line-clamp-2">{image.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar className="w-3 h-3" />
                    {new Date(image.date).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <PermissionGuard resource="gallery" action="update">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(image)} className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </PermissionGuard>
                    <PermissionGuard resource="gallery" action="delete">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(image.id)}
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

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {filterCategory === "all" ? "No Images Yet" : `No ${filterCategory} Images`}
              </h3>
              <p className="text-gray-500 mb-4">
                {filterCategory === "all" 
                  ? "Start by uploading your first images" 
                  : `Upload images for ${filterCategory} activities`}
              </p>
              <PermissionGuard resource="gallery" action="create">
                <Button onClick={() => setIsAddingImage(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Images
                </Button>
              </PermissionGuard>
            </div>
          )}
        </div>
      </div>
    </PermissionGuard>
  )
}
