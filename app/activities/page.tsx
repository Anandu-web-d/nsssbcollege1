"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, FileText, Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import PDFViewer from "@/components/pdf-viewer"

type Activity = {
  id: string
  title: string
  date: string
  location: string
  participants: number
  description: string
  category: "Health" | "Education" | "Environment" | "Social Welfare"
  month: string
  year: string
  images?: string[]
  pdfUrl?: string
}

type Report = {
  id: string
  month: string
  year: string
  title: string
  pdfUrl: string
  summary: string
  totalActivities: number
  totalParticipants: number
  totalVolunteers: number
  budgetUtilized: string
  uploadDate: string
  fileSize: string
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [showReport, setShowReport] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [aRes, rRes] = await Promise.all([
          fetch("/api/activities", { cache: "no-store" }),
          fetch(`/api/reports?year=${new Date().getFullYear()}`, { cache: "no-store" }),
        ])
        const [aData, rData] = await Promise.all([aRes.json(), rRes.json()])
        setActivities(aData)
        setReports(rData)
      } catch (e) {
        console.error("Failed to load activities/reports", e)
      }
    }
    load()
  }, [])

  const latest = useMemo(() => {
    return [...activities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [activities])

  const groupedByYear: Record<string, Report[]> = useMemo(() => {
    return reports.reduce((acc, r) => {
      acc[r.year] = acc[r.year] || []
      acc[r.year].push(r)
      return acc
    }, {} as Record<string, Report[]>)
  }, [reports])

  const currentYear = new Date().getFullYear().toString()
  const yearReports = (groupedByYear[currentYear] || []).sort((a, b) => a.month.localeCompare(b.month))

  const currentReport = reports.find((r) => r.month.toLowerCase() === (showReport || "").toLowerCase() && r.year === currentYear)

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

  const viewReport = (month: string) => {
    setShowReport(month)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Activities</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our latest activities and browse monthly reports (year-wise).
          </p>
        </div>

        {/* Monthly Reports (Year-wise Jan-Dec) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Reports ({currentYear})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {yearReports.map((report) => (
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

        {/* Latest Activities (newest first) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((activity) => (
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
                  <p className="text-gray-600">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

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
