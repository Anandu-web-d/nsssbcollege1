"use client"

import ImageGallery from "@/components/image-gallery"
import { useEffect, useState } from "react"
import { dataStore, type GalleryImage } from "@/lib/data-store"

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    setGalleryImages(dataStore.getGalleryImages())
  }, [])

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">NSS Photo Gallery</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Capturing moments of service, dedication, and community impact through our various NSS activities
          </p>
        </div>

        {galleryImages.length > 0 ? (
          <ImageGallery images={galleryImages} title="Our Activities in Pictures" />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Gallery is being updated</h3>
            <p className="text-gray-500">Photos from our activities will be available soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
