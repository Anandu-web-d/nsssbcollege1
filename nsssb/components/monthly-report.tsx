"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, X, FileDown, File } from "lucide-react"

interface MonthlyReportData {
  title: string
  summary: string
  totalActivities: number
  totalParticipants: number
  totalVolunteers: number
  budgetUtilized: string
  keyHighlights: string[]
  challenges: string[]
  upcomingPlans: string[]
  photos: number
  mediaLinks: string[]
}

interface MonthlyReportProps {
  reportData: MonthlyReportData
  onClose: () => void
  month: string
}

export default function MonthlyReport({ reportData, onClose, month }: MonthlyReportProps) {
  const generateHTMLReport = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportData.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
        .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { width: 60px; height: 60px; margin: 0 auto 10px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
        .stat-card { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #2563eb; }
        .stat-number { font-size: 24px; font-weight: bold; color: #2563eb; }
        .section { margin: 30px 0; }
        .section h2 { color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
        .highlight-list { background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #16a34a; }
        .challenge-list { background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; }
        .plan-list { background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 8px 0; padding-left: 20px; position: relative; }
        li:before { content: "•"; color: #2563eb; font-weight: bold; position: absolute; left: 0; }
        .footer { margin-top: 50px; text-align: center; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiMyNTYzZWIiLz4KPHRleHQgeD0iMzAiIHk9IjM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPk5TUzwvdGV4dD4KPC9zdmc+" alt="NSS Logo" style="width: 100%; height: 100%;">
        </div>
        <h1>${reportData.title}</h1>
        <p><strong>National Service Scheme - SB College</strong></p>
        <p style="color: #6b7280;">"Not Me But You"</p>
    </div>

    <div class="section">
        <h2>Executive Summary</h2>
        <p>${reportData.summary}</p>
    </div>

    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-number">${reportData.totalActivities}</div>
            <div>Total Activities</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${reportData.totalParticipants}</div>
            <div>Participants</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${reportData.totalVolunteers}</div>
            <div>Volunteers</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${reportData.budgetUtilized}</div>
            <div>Budget Used</div>
        </div>
    </div>

    <div class="section">
        <h2>Key Highlights</h2>
        <div class="highlight-list">
            <ul>
                ${reportData.keyHighlights.map((highlight) => `<li>${highlight}</li>`).join("")}
            </ul>
        </div>
    </div>

    <div class="section">
        <h2>Challenges Faced</h2>
        <div class="challenge-list">
            <ul>
                ${reportData.challenges.map((challenge) => `<li>${challenge}</li>`).join("")}
            </ul>
        </div>
    </div>

    <div class="section">
        <h2>Upcoming Plans</h2>
        <div class="plan-list">
            <ul>
                ${reportData.upcomingPlans.map((plan) => `<li>${plan}</li>`).join("")}
            </ul>
        </div>
    </div>

    <div class="section">
        <h2>Documentation & Media</h2>
        <p><strong>Photos Captured:</strong> ${reportData.photos}</p>
        <p><strong>Media Coverage:</strong></p>
        <ul>
            ${reportData.mediaLinks.map((link) => `<li>${link}</li>`).join("")}
        </ul>
    </div>

    <div class="footer">
        <p>Report Generated on: ${new Date().toLocaleDateString()}</p>
        <p><strong>NSS SB College - National Service Scheme</strong></p>
        <p>Developed by Anandu A</p>
    </div>
</body>
</html>
    `
  }

  const downloadPDF = () => {
    const htmlContent = generateHTMLReport()
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `NSS_Monthly_Report_${month}_${new Date().getFullYear()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadWord = () => {
    const wordContent = `
${reportData.title}
${"=".repeat(reportData.title.length)}

NATIONAL SERVICE SCHEME - SB COLLEGE
"Not Me But You"

EXECUTIVE SUMMARY:
${reportData.summary}

STATISTICS:
• Total Activities: ${reportData.totalActivities}
• Total Participants: ${reportData.totalParticipants}
• Total Volunteers: ${reportData.totalVolunteers}
• Budget Utilized: ${reportData.budgetUtilized}

KEY HIGHLIGHTS:
${reportData.keyHighlights.map((h) => `• ${h}`).join("\n")}

CHALLENGES FACED:
${reportData.challenges.map((c) => `• ${c}`).join("\n")}

UPCOMING PLANS:
${reportData.upcomingPlans.map((p) => `• ${p}`).join("\n")}

DOCUMENTATION & MEDIA:
• Photos Captured: ${reportData.photos}
• Media Coverage: ${reportData.mediaLinks.join(", ")}

---
Report Generated on: ${new Date().toLocaleDateString()}
NSS SB College - National Service Scheme
Developed by Anandu A
    `

    const blob = new Blob([wordContent], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `NSS_Monthly_Report_${month}_${new Date().getFullYear()}.doc`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadTextReport = () => {
    const reportContent = `
${reportData.title}
${"=".repeat(reportData.title.length)}

NATIONAL SERVICE SCHEME - SB COLLEGE
"Not Me But You"

EXECUTIVE SUMMARY:
${reportData.summary}

STATISTICS:
- Total Activities: ${reportData.totalActivities}
- Total Participants: ${reportData.totalParticipants}
- Total Volunteers: ${reportData.totalVolunteers}
- Budget Utilized: ${reportData.budgetUtilized}

KEY HIGHLIGHTS:
${reportData.keyHighlights.map((h) => `• ${h}`).join("\n")}

CHALLENGES FACED:
${reportData.challenges.map((c) => `• ${c}`).join("\n")}

UPCOMING PLANS:
${reportData.upcomingPlans.map((p) => `• ${p}`).join("\n")}

DOCUMENTATION & MEDIA:
- Photos Captured: ${reportData.photos}
- Media Coverage: ${reportData.mediaLinks.join(", ")}

Generated on: ${new Date().toLocaleDateString()}
NSS SB College - National Service Scheme
Developed by Anandu A
    `

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `NSS_Monthly_Report_${month}_${new Date().getFullYear()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
    <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-2">
              <img
                src="/placeholder.svg?height=48&width=48&text=NSS+Logo"
                alt="NSS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {reportData.title}
              </CardTitle>
              <CardDescription className="text-blue-600 mt-2">{reportData.summary}</CardDescription>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{reportData.totalActivities}</div>
            <div className="text-sm text-gray-600">Total Activities</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{reportData.totalParticipants}</div>
            <div className="text-sm text-gray-600">Participants</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{reportData.totalVolunteers}</div>
            <div className="text-sm text-gray-600">Volunteers</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{reportData.budgetUtilized}</div>
            <div className="text-sm text-gray-600">Budget Used</div>
          </div>
        </div>

        {/* Report Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">✓</Badge>
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                {reportData.keyHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-orange-700 flex items-center gap-2">
                <Badge className="bg-orange-100 text-orange-800">⚠</Badge>
                Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                {reportData.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">→</Badge>
                Upcoming Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                {reportData.upcomingPlans.map((plan, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{plan}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Media and Documentation */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Documentation & Media Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Photo Documentation</h4>
                <p className="text-sm text-gray-600">📸 {reportData.photos} photos captured and archived</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Media Coverage</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {reportData.mediaLinks.map((link, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Eye className="w-3 h-3" />
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t bg-white rounded-lg p-4">
          <div className="text-sm text-gray-600">Report generated on {new Date().toLocaleDateString()}</div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={downloadPDF}
              variant="outline"
              size="sm"
              className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
            >
              <FileDown className="w-4 h-4 mr-2" />
              Download HTML
            </Button>
            <Button
              onClick={downloadWord}
              variant="outline"
              size="sm"
              className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              <File className="w-4 h-4 mr-2" />
              Download Word
            </Button>
            <Button
              onClick={downloadTextReport}
              variant="outline"
              size="sm"
              className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Text
            </Button>
            <Button onClick={onClose} variant="ghost" size="sm">
              Close Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
