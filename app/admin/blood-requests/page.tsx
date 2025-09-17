"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Droplets, Phone, MapPin, Hospital, User, Clock, Edit, Trash2, ArrowLeft, Filter } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import PermissionGuard from "@/components/admin/permission-guard"

type BloodRequest = {
  id: string
  name: string
  phone: string
  bloodGroup: string
  hospital: string
  urgency: "Low" | "Medium" | "High" | "Critical"
  description?: string
  location: string
  status: "Pending" | "Fulfilled" | "Cancelled"
  createdAt: string
  updatedAt: string
  contactPerson?: string
  contactPhone?: string
}

export default function AdminBloodRequestsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<BloodRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<BloodRequest[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [bloodGroupFilter, setBloodGroupFilter] = useState<string>("all")
  const [editingRequest, setEditingRequest] = useState<BloodRequest | null>(null)
  const [updateNotes, setUpdateNotes] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
      return
    }
    loadRequests()
  }, [user, router])

  useEffect(() => {
    filterRequests()
  }, [requests, statusFilter, bloodGroupFilter])

  const loadRequests = async () => {
    try {
      const res = await fetch("/api/blood-requests", { cache: "no-store" })
      const data: BloodRequest[] = await res.json()
      setRequests(data)
    } catch (e) {
      console.error("Failed to load blood requests", e)
      setRequests([])
    }
  }

  const filterRequests = () => {
    let filtered = [...requests]
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(r => r.status === statusFilter)
    }
    
    if (bloodGroupFilter !== "all") {
      filtered = filtered.filter(r => r.bloodGroup === bloodGroupFilter)
    }
    
    setFilteredRequests(filtered)
  }

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/blood-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          status,
          ...(updateNotes && { description: updateNotes })
        })
      })
      loadRequests()
      setEditingRequest(null)
      setUpdateNotes("")
    } catch (e) {
      console.error("Failed to update request", e)
    }
  }

  const deleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blood request?")) return
    try {
      await fetch(`/api/blood-requests/${id}`, { method: "DELETE" })
      loadRequests()
    } catch (e) {
      console.error("Failed to delete request", e)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Low": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "High": return "bg-orange-100 text-orange-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "Fulfilled": return "bg-green-100 text-green-800"
      case "Cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (!user) return <div>Loading...</div>

  return (
    <PermissionGuard resource="blood_requests" action="read">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Blood Requests</h1>
                <p className="text-gray-600">Manage blood donation requests from the community</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={bloodGroupFilter} onValueChange={setBloodGroupFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Blood Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold">{requests.length}</p>
                    <p className="text-sm text-gray-600">Total Requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{requests.filter(r => r.status === "Pending").length}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{requests.filter(r => r.status === "Fulfilled").length}</p>
                    <p className="text-sm text-gray-600">Fulfilled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold">{requests.filter(r => r.urgency === "Critical").length}</p>
                    <p className="text-sm text-gray-600">Critical</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requests List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{request.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4" />
                        {request.phone}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency}
                      </Badge>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Droplets className="w-4 h-4 text-red-600" />
                      <span className="font-medium">Blood Group:</span>
                      <Badge variant="outline">{request.bloodGroup}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Hospital className="w-4 h-4 text-blue-600" />
                      <span>{request.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>{request.location}</span>
                    </div>
                    {request.contactPerson && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-purple-600" />
                        <span>Contact: {request.contactPerson} ({request.contactPhone})</span>
                      </div>
                    )}
                    {request.description && (
                      <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {request.description}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      Requested: {formatDate(request.createdAt)}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <PermissionGuard resource="blood_requests" action="update">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingRequest(request)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Blood Request</DialogTitle>
                            <DialogDescription>
                              Update the status and add notes for this blood request
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Status</Label>
                              <Select 
                                value={request.status} 
                                onValueChange={(value) => setEditingRequest({...request, status: value as any})}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                  <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Update Notes</Label>
                              <Textarea
                                value={updateNotes}
                                onChange={(e) => setUpdateNotes(e.target.value)}
                                placeholder="Add any notes about this request..."
                                rows={3}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => updateRequestStatus(request.id, editingRequest?.status || request.status)}
                                className="flex-1"
                              >
                                Update Request
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  setEditingRequest(null)
                                  setUpdateNotes("")
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </PermissionGuard>
                    <PermissionGuard resource="blood_requests" action="delete">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteRequest(request.id)}
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

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <Droplets className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Blood Requests</h3>
              <p className="text-gray-500">
                {requests.length === 0 
                  ? "No blood requests have been submitted yet" 
                  : "No requests match your current filters"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </PermissionGuard>
  )
}
