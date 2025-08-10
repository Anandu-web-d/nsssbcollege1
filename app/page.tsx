import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Award, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const recentActivities = [
    {
      title: "Blood Donation Camp",
      date: "January 15, 2024",
      description: "Organized a blood donation camp in collaboration with local hospital",
      participants: 150,
    },
    {
      title: "Tree Plantation Drive",
      date: "January 22, 2024",
      description: "Planted 500+ saplings in the college campus and nearby areas",
      participants: 80,
    },
    {
      title: "Digital Literacy Program",
      date: "January 28, 2024",
      description: "Conducted computer literacy classes for rural community",
      participants: 45,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg?height=600&width=1200&text=NSS+Community+Service+Background"
            alt="NSS Community Service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/80"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-white p-3">
              <img
                src="/placeholder.svg?height=96&width=96&text=NSS+Logo"
                alt="NSS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-5xl font-bold mb-6">National Service Scheme</h1>
            <p className="text-xl mb-8 opacity-90">
              "Not Me But You" - Serving the community with dedication and commitment
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/activities">View Activities</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Link href="/about">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">120+</h3>
              <p className="text-gray-600">Activities Per Year</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-600">Active Volunteers</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">25+</h3>
              <p className="text-gray-600">Awards Won</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">10,000+</h3>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Activities</h2>
            <p className="text-xl mb-8 opacity-90">
              We organize 10+ activities every month to serve our community and make a positive impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentActivities.map((activity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{activity.date}</Badge>
                    <span className="text-sm text-gray-500">{activity.participants} participants</span>
                  </div>
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{activity.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/activities">View All Activities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of something bigger. Help us serve the community and make a difference.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">Get Involved</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
