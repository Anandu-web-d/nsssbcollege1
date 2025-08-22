"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone } from 'lucide-react'
import Image from "next/image"
import { useEffect, useState } from "react"
import { dataStore, type TeamMember } from "@/lib/data-store"

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    setTeamMembers(dataStore.getTeamMembers())
  }, [])

  const leaders = teamMembers.filter((member) => member.role === "Leader")
  const programOfficers = teamMembers.filter((member) => member.role === "Program Officer")

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About NSS</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The National Service Scheme (NSS) is a Central Sector Scheme of Government of India, Ministry of Youth
            Affairs & Sports. It provides opportunity to the student youth of 11th & 12th Class of schools at +2 Board
            level and student youth of Technical Institution, Graduate & Post Graduate at colleges and University level
            of India to take part in various government led community service activities & programmes.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To provide hands-on experience to young students in delivering community service and to develop their
                personality through community service. We aim to create socially responsible citizens who contribute to
                national development.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To build a generation of youth who are committed to social service, understand community problems, and
                work towards sustainable solutions for societal development through voluntary service.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Team Leaders */}
        {leaders.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription>{member.position}</CardDescription>
                    <Badge className="w-fit mx-auto mt-2 bg-blue-100 text-blue-800">{member.role}</Badge>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Program Officers */}
        {programOfficers.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Program Officers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programOfficers.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription>{member.position}</CardDescription>
                    <Badge className="w-fit mx-auto mt-2 bg-green-100 text-green-800">{member.role}</Badge>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {teamMembers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Team information will be available soon</h3>
            <p className="text-gray-500">Our team members are being updated</p>
          </div>
        )}
      </div>
    </div>
  )
}
