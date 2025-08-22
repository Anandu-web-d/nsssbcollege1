"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Edit, Trash2, Plus } from 'lucide-react'
import { useState } from "react"
import { monthlyReports, type MonthlyReportData } from "@/lib/reports-data"
import PermissionGuard from "@/components/admin/permission-guard"

export default function AdminReportsPage() {
  const [reports, setReports] = useState<MonthlyReportData[]>(monthlyReports)
  const [isAddingReport, setIsAddingReport] = useState(false)
  const [editingReport, setEditingReport] = useState<string | null>(null)
  const [newReport, setNewReport] = useState<Partial<MonthlyReportData>>({
    month: "",
    year: "2024",
    title: "",
    summary: "",
    totalActivities: 0,
    totalParticipants: 0,
    totalVolunteers: 0,
    budgetUtilized: "",
    pdfUrl: "",
    fileSize: "",
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      // In a real application, you would upload this to a server
      // For now, we'll create a mock URL
      const mockUrl = URL.createObjectURL(file)
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1)

      setNewReport((prev) => ({
        ...prev,
        pdfUrl: mockUrl,
        fileSize: `${fileSizeMB} MB`,
      }))
    }
  }

  const handleAddReport = () => {
    if (newReport.month && newReport.title && newReport.pdfUrl) {
      const report: MonthlyReportData = {
        id: `${newReport.month?.toLowerCase()}-${newReport.year}`,
        month: newReport.month!,
        year: newReport.year!,
        title: newReport.title!,
        pdfUrl: newReport.pdfUrl!,
        summary: newReport.summary || "",
        totalActivities: newReport.totalActivities || 0,
        totalParticipants: newReport.totalParticipants || 0,
        totalVolunteers: newReport.totalVolunteers || 0,
        budgetUtilized: newReport.budgetUtilized || "₹0",
        uploadDate: new Date().toISOString().split("T")[0],
        fileSize: newReport.fileSize || "0 MB",
      }

      setReports((prev) => [...prev, report])
      setNewReport({
        month: "",
        year: "2024",
        title: "",
        summary: "",
        totalActivities: 0,
        totalParticipants: 0,
        totalVolunteers: 0,
        budgetUtilized: "",
        pdfUrl: "",
        fileSize: "",
      })
      setIsAddingReport(false)
    }
  }

  const handleDeleteReport = (id: string) => {
    setReports((prev) => prev.filter((report) => report.id !== id))
  }

  return (
    <PermissionGuard resource="reports" action="read">
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Manage Monthly Reports</h1>
              <p className="text-gray-600 mt-2">Upload and manage NSS monthly activity reports</p>
            </div>
            <PermissionGuard resource="reports" action="create">
              <Button onClick={() => setIsAddingReport(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Report
              </Button>
            </PermissionGuard>
          </div>

          {/* Add New Report Form */}
          {isAddingReport && (
            <Card className="mb-8 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Add New Monthly Report</CardTitle>
                <CardDescription>Upload a new PDF report and fill in the details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="month">Month</Label>
                    <Input
                      id="month"
                      value={newReport.month}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, month: e.target.value }))}
                      placeholder="e.g., January"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={newReport.year}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, year: e.target.value }))}
                      placeholder="e.g., 2024"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Report Title</Label>
                  <Input
                    id="title"
                    value={newReport.title}
                    onChange={(e) => setNewReport((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., January 2024 Monthly Report"
                  />
                </div>

                <div>
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    value={newReport.summary}
                    onChange={(e) => setNewReport((prev) => ({ ...prev, summary: e.target.value }))}
                    placeholder="Brief summary of the month's activities..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="activities">Total Activities</Label>
                    <Input
                      id="activities"
                      type="number"
                      value={newReport.totalActivities}
                      onChange={(e) =>
                        setNewReport((prev) => ({ ...prev, totalActivities: Number.parseInt(e.target.value) || 0 }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="participants">Total Participants</Label>
                    <Input
                      id="participants"
                      type="number"
                      value={newReport.totalParticipants}
                      onChange={(e) =>
                        setNewReport((prev) => ({ ...prev, totalParticipants: Number.parseInt(e.target.value) || 0 }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="volunteers">Total Volunteers</Label>
                    <Input
                      id="volunteers"
                      type="number"
                      value={newReport.totalVolunteers}
                      onChange={(e) =>
                        setNewReport((prev) => ({ ...prev, totalVolunteers: Number.parseInt(e.target.value) || 0 }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget Utilized</Label>
                    <Input
                      id="budget"
                      value={newReport.budgetUtilized}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, budgetUtilized: e.target.value }))}
                      placeholder="e.g., ₹25,000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pdf">Upload PDF Report</Label>
                  <div className="mt-2">
                    <Input
                      id="pdf"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {newReport.pdfUrl && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                        <FileText className="w-4 h-4" />
                        PDF uploaded successfully ({newReport.fileSize})
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddReport} disabled={!newReport.month || !newReport.title || !newReport.pdfUrl}>
                    <Upload className="w-4 h-4 mr-2" />
                    Add Report
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingReport(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reports List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>
                        {report.month} {report.year} • {report.fileSize}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {new Date(report.uploadDate).toLocaleDateString()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <span className="font-semibold text-blue-600">{report.totalActivities}</span>
                      <div className="text-gray-600">Activities</div>
                    </div>
                    <div>
                      <span className="font-semibold text-green-600">{report.totalParticipants}</span>
                      <div className="text-gray-600">Participants</div>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-600">{report.totalVolunteers}</span>
                      <div className="text-gray-600">Volunteers</div>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-600">{report.budgetUtilized}</span>
                      <div className="text-gray-600">Budget</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{report.summary}</p>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(report.pdfUrl, "_blank")}
                      className="flex-1"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View PDF
                    </Button>
                    <PermissionGuard resource="reports" action="update">
                      <Button variant="outline" size="sm" onClick={() => setEditingReport(report.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </PermissionGuard>
                    <PermissionGuard resource="reports" action="delete">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteReport(report.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </PermissionGuard>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {reports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Reports Yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first monthly report</p>
              <Button onClick={() => setIsAddingReport(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Report
              </Button>
            </div>
          )}
        </div>
      </div>
    </PermissionGuard>
  )
}
