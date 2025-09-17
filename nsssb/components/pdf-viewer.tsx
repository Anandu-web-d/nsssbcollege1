"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, X, ExternalLink, Eye } from "lucide-react"
import { useState } from "react"

interface PDFViewerProps {
  pdfUrl: string
  title: string
  month: string
  year: string
  onClose: () => void
  reportData?: {
    totalActivities: number
    totalParticipants: number
    totalVolunteers: number
    budgetUtilized: string
    summary: string
  }
}

export default function PDFViewer({ pdfUrl, title, month, year, onClose, reportData }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  const downloadPDF = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = `NSS_Monthly_Report_${month}_${year}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openInNewTab = () => {
    window.open(pdfUrl, "_blank")
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
                {title}
              </CardTitle>
              <Badge className="mt-2 bg-blue-100 text-blue-800">
                {month} {year}
              </Badge>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Stats if available */}
        {reportData && (
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
        )}

        {/* PDF Viewer */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Monthly Report Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[600px] border rounded-lg overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading PDF...</p>
                  </div>
                </div>
              )}
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full"
                title={`${title} - PDF Report`}
                onLoad={() => setIsLoading(false)}
                style={{ border: "none" }}
              />
            </div>

            {/* Fallback for browsers that don't support iframe PDF viewing */}
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 mb-2">
                <strong>Can't see the PDF?</strong> Your browser might not support inline PDF viewing.
              </p>
              <div className="flex gap-2">
                <Button onClick={openInNewTab} variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Button>
                <Button onClick={downloadPDF} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary if available */}
        {reportData?.summary && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Report Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{reportData.summary}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t bg-white rounded-lg p-4">
          <div className="text-sm text-gray-600">
            Report for {month} {year} • NSS SB College
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={downloadPDF}
              variant="outline"
              size="sm"
              className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button
              onClick={openInNewTab}
              variant="outline"
              size="sm"
              className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
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
