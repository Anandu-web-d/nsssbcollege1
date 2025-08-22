"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, MapPin, FileText, Clock, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PDFViewer from "@/components/pdf-viewer"
import { getReportByMonth, monthlyReports } from "@/lib/reports-data"

const API_URL = "http://localhost:4000/api/activities"
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export default function ActivitiesPage() {
  interface Activity {
    id?: number
    title: string
    date: string
    location: string
    participants: number
    description: string
    category: string
  }
  const [activities, setActivities] = useState<Activity[]>([])
  const [showReport, setShowReport] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false) // Start with false to prevent hydration issues
  const [selectedYear, setSelectedYear] = useState("2025")

  // Fetch activities from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setActivities)
  }, [])

  // Add activity
  interface Activity {
    id?: number
    title: string
    date: string
    location: string
    participants: number
    description: string
    category: string
  }

  const addActivity = async (activity: Activity): Promise<void> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    })
    const newActivity: Activity = await res.json()
    setActivities([newActivity, ...activities])
  }

  // Edit activity
  const editActivity = async (id: number, updated: Activity) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
    const updatedActivity = await res.json()
    setActivities(activities.map((a) => (a.id === id ? updatedActivity : a)))
  }

  // Delete activity
  const deleteActivity = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    setActivities(activities.filter((a) => a.id !== id))
  }

  // Example admin UI for adding activity
  // Replace with your form and validation
  const handleAdd = () => {
    addActivity({
      title: "New Activity",
      date: "2025-08-21",
      location: "New Location",
      participants: 50,
      description: "Description here",
      category: "Health",
    })
  }

  const viewReport = (month: string) => {
    setShowReport(month)
  }

  const currentReport = showReport ? getReportByMonth(showReport, "2024") : null

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

        {/* Year Selector */}
        <div className="mb-4 flex justify-end">
          <label className="mr-2 font-semibold">Select Year:</label>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            {/* Add more years as needed */}
          </select>
        </div>

        {/* Monthly Activities Tabs */}
        <Tabs defaultValue={MONTHS[0].toLowerCase()} className="w-full">
          <TabsList className="grid w-full grid-cols-12 mb-8">
            {MONTHS.map(month => (
              <TabsTrigger key={month} value={month.toLowerCase()}>
                {month} {selectedYear}
              </TabsTrigger>
            ))}
          </TabsList>
          {MONTHS.map(month => (
            <TabsContent key={month} value={month.toLowerCase()}>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold">{month} {selectedYear} Activities</h3>
                <Button
                  onClick={() => viewReport(month)}
                  variant="outline"
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Monthly Report
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities
                  .filter(activity => activity.date.startsWith(`${selectedYear}-${String(MONTHS.indexOf(month)+1).padStart(2,"0")}`))
                  .map((activity, index) => (
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
          ))}
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
