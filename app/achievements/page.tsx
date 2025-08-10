"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Medal, Star } from 'lucide-react'
import Image from "next/image"
import { useEffect, useState } from "react"
import { dataStore, type Achievement } from "@/lib/data-store"

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    setAchievements(dataStore.getAchievements())
  }, [])

  const statistics = [
    {
      number: `${achievements.length}+`,
      label: "Awards Won",
      description: "Recognition at various levels",
    },
    {
      number: "500+",
      label: "Volunteers Trained",
      description: "Active community servants",
    },
    {
      number: "10,000+",
      label: "Lives Impacted",
      description: "Through our initiatives",
    },
    {
      number: "120+",
      label: "Activities Completed",
      description: "Per year on average",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      position: "District Collector",
      message:
        "The NSS unit has shown exceptional dedication to community service. Their initiatives have made a significant impact on rural development.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Mrs. Priya Sharma",
      position: "NGO Director",
      message:
        "Working with this NSS unit has been a pleasure. Their volunteers are well-trained, dedicated, and truly committed to social service.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Mr. Amit Patel",
      position: "Village Sarpanch",
      message:
        "The health camps and literacy programs organized by NSS have brought positive changes to our village. We are grateful for their service.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

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

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Achievements</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Recognition and awards received for our dedication to community service and social development
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {statistics.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-blue-600">{stat.number}</CardTitle>
                <CardDescription className="font-semibold">{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Awards and Recognition */}
        {achievements.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Awards & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <p className="text-gray-600">{achievement.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Impact Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Impact Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Blood Donation Camp"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Blood Donation Drives</h3>
                <p className="text-sm text-gray-600">Over 2000 units of blood collected through our camps</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Tree Plantation"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Environmental Conservation</h3>
                <p className="text-sm text-gray-600">5000+ trees planted across various locations</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Digital Literacy"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Digital Literacy</h3>
                <p className="text-sm text-gray-600">1000+ people trained in digital skills</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.position}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.message}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {achievements.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Achievements will be updated soon</h3>
            <p className="text-gray-500">Our awards and recognitions are being compiled</p>
          </div>
        )}
      </div>
    </div>
  )
}
