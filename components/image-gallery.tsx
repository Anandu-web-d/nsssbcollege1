"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryImage {
  src: string
  alt: string
  title: string
  category: string
  date: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  title?: string
}

export default function ImageGallery({ images, title = "Photo Gallery" }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
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

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{title}</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-48 overflow-hidden" onClick={() => openLightbox(index)}>
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={300}
                height={200}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <Badge className={getCategoryColor(image.category)}>{image.category}</Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1 text-sm">{image.title}</h3>
              <p className="text-xs text-gray-500">{image.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              onClick={closeLightbox}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              onClick={prevImage}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              onClick={nextImage}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                width={800}
                height={600}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{images[selectedImage].title}</h3>
                  <Badge className={getCategoryColor(images[selectedImage].category)}>
                    {images[selectedImage].category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{images[selectedImage].date}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
