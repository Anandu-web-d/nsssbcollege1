"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, FileText, Clock, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import PDFViewer from "@/components/pdf-viewer"
import { getReportByMonth, monthlyReports } from "@/lib/reports-data"

export default function ActivitiesPage() {
  const monthlyActivities = {
    january: [
      {
        title: "Blood Donation Camp",
        date: "January 5, 2024",
        location: "College Campus",
        participants: 150,
        description: "Organized blood donation camp in collaboration with Red Cross Society",
        category: "Health",
      },
      {
        title: "Digital Literacy Program",
        date: "January 12, 2024",
        location: "Rural Community Center",
        participants: 45,
        description: "Computer literacy classes for rural community members",
        category: "Education",
      },
      {
        title: "Tree Plantation Drive",
        date: "January 18, 2024",
        location: "College Campus & Nearby Areas",
        participants: 80,
        description: "Planted 500+ saplings to promote environmental conservation",
        category: "Environment",
      },
      {
        title: "Cleanliness Drive",
        date: "January 22, 2024",
        location: "Local Market Area",
        participants: 60,
        description: "Community cleanliness and awareness campaign",
        category: "Social Welfare",
      },
      {
        title: "Health Checkup Camp",
        date: "January 26, 2024",
        location: "Village Health Center",
        participants: 120,
        description: "Free health checkup and medical consultation for villagers",
        category: "Health",
      },
      {
        title: "Adult Literacy Classes",
        date: "January 28, 2024",
        location: "Community Hall",
        participants: 35,
        description: "Basic literacy classes for adult learners",
        category: "Education",
      },
      {
        title: "Road Safety Awareness",
        date: "January 30, 2024",
        location: "Main Road Junction",
        participants: 25,
        description: "Traffic awareness and road safety campaign",
        category: "Social Welfare",
      },
    ],
    february: [
      {
        title: "Women Empowerment Workshop",
        date: "February 3, 2024",
        location: "Women's College",
        participants: 90,
        description: "Skills development and empowerment workshop for women",
        category: "Social Welfare",
      },
      {
        title: "Science Exhibition",
        date: "February 8, 2024",
        location: "School Premises",
        participants: 200,
        description: "Science exhibition for school students to promote STEM education",
        category: "Education",
      },
      {
        title: "Blood Pressure Screening",
        date: "February 14, 2024",
        location: "Senior Citizen Center",
        participants: 75,
        description: "Free blood pressure screening for elderly citizens",
        category: "Health",
      },
      {
        title: "Waste Management Drive",
        date: "February 18, 2024",
        location: "Residential Areas",
        participants: 55,
        description: "Waste segregation and management awareness program",
        category: "Environment",
      },
      {
        title: "Career Guidance Session",
        date: "February 22, 2024",
        location: "High School",
        participants: 150,
        description: "Career counseling and guidance for high school students",
        category: "Education",
      },
      {
        title: "Nutrition Awareness Camp",
        date: "February 25, 2024",
        location: "Anganwadi Center",
        participants: 40,
        description: "Nutrition education for mothers and children",
        category: "Health",
      },
      {
        title: "Cultural Heritage Walk",
        date: "February 28, 2024",
        location: "Historical Sites",
        participants: 65,
        description: "Heritage conservation awareness through cultural walk",
        category: "Social Welfare",
      },
    ],
    march: [
      {
        title: "Water Conservation Workshop",
        date: "March 5, 2024",
        location: "Community Center",
        participants: 85,
        description: "Rainwater harvesting and water conservation techniques",
        category: "Environment",
      },
      {
        title: "Eye Checkup Camp",
        date: "March 10, 2024",
        location: "Rural Health Center",
        participants: 110,
        description: "Free eye examination and distribution of spectacles",
        category: "Health",
      },
      {
        title: "Skill Development Training",
        date: "March 15, 2024",
        location: "Vocational Training Center",
        participants: 50,
        description: "Vocational skills training for unemployed youth",
        category: "Education",
      },
      {
        title: "Anti-Drug Awareness",
        date: "March 20, 2024",
        location: "College Auditorium",
        participants: 300,
        description: "Drug abuse prevention and awareness campaign",
        category: "Social Welfare",
      },
      {
        title: "Organic Farming Workshop",
        date: "March 22, 2024",
        location: "Agricultural Field",
        participants: 40,
        description: "Training on organic farming methods for farmers",
        category: "Environment",
      },
      {
        title: "Mental Health Awareness",
        date: "March 26, 2024",
        location: "Community Hall",
        participants: 70,
        description: "Mental health awareness and counseling session",
        category: "Health",
      },
      {
        title: "Digital Payment Training",
        date: "March 28, 2024",
        location: "Bank Branch",
        participants: 60,
        description: "Training on digital payment methods for elderly",
        category: "Education",
      },
    ],
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

  const [showReport, setShowReport] = useState<string | null>(null)

  const viewReport = (month: string) => {
    setShowReport(month)
  }

  const currentReport = showReport ? getReportByMonth(showReport, "2024") : null

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Activities</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We organize 10+ activities every month across various domains including health, education, environment, and
            social welfare to serve our community effectively.
          </p>
        </div>

        {/* Available Reports Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Reports Archive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthlyReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {report.month} {report.year}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {report.totalActivities} activities • {report.totalParticipants} participants
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {report.fileSize}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{report.summary}</p>
                  <div className="flex gap-2">
                    <Button onClick={() => viewReport(report.month)} size="sm" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                    <Button
                      onClick={() => {
                        const link = document.createElement("a")
                        link.href = report.pdfUrl
                        link.download = `NSS_${report.month}_${report.year}_Report.pdf`
                        link.click()
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    Uploaded: {new Date(report.uploadDate).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* PDF Viewer */}
        {showReport && currentReport && (
          <PDFViewer
            pdfUrl={currentReport.pdfUrl}
            title={currentReport.title}
            month={currentReport.month}
            year={currentReport.year}
            onClose={() => setShowReport(null)}
            reportData={{
              totalActivities: currentReport.totalActivities,
              totalParticipants: currentReport.totalParticipants,
              totalVolunteers: currentReport.totalVolunteers,
              budgetUtilized: currentReport.budgetUtilized,
              summary: currentReport.summary,
            }}
          />
        )}

        {/* Monthly Activities Tabs */}
        <Tabs defaultValue="january" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="january">January 2024</TabsTrigger>
            <TabsTrigger value="february">February 2024</TabsTrigger>
            <TabsTrigger value="march">March 2024</TabsTrigger>
          </TabsList>

          <TabsContent value="january">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold">January 2024 Activities</h3>
              <Button
                onClick={() => viewReport("January")}
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Monthly Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthlyActivities.january.map((activity, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
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
                    <p className="text-gray-600">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="february">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold">February 2024 Activities</h3>
              <Button
                onClick={() => viewReport("February")}
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Monthly Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthlyActivities.february.map((activity, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
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
                    <p className="text-gray-600">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="march">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold">March 2024 Activities</h3>
              <Button
                onClick={() => viewReport("March")}
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Monthly Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthlyActivities.march.map((activity, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
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
                    <p className="text-gray-600">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Activity Categories Summary */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Activity Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-red-600">Health</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Blood donation camps, health checkups, medical awareness programs
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-blue-600">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Digital literacy, career guidance, skill development programs</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-green-600">Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Tree plantation, waste management, water conservation initiatives
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-purple-600">Social Welfare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Community service, awareness campaigns, empowerment programs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
