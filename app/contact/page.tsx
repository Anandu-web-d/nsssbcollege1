"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Users, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact NSS SB</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with us to join our mission, volunteer for activities, or learn more about our initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Get In Touch
                </CardTitle>
                <CardDescription>
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">
                      NSS Unit, SB College
                      <br />
                      College Road, Changanassery
                      <br />
                      Kottayam District, Kerala - 686101
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">
                      Office: +91 481 242 1234
                      <br />
                      Coordinator: +91 9876543210
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">
                      nss@sbcollege.edu
                      <br />
                      coordinator.nss@sbcollege.edu
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:00 PM
                      <br />
                      Saturday: 9:00 AM - 1:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Join as Volunteer
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Report an Issue
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Partnership Inquiry
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter message subject"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message here..."
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
              <CardDescription>
                Visit our campus to learn more about NSS activities and volunteer opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">SB College, Changanassery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
