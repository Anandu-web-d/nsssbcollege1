"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Mail, Phone, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { dataStore, type TeamMember } from "@/lib/data-store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import PermissionGuard from "@/components/admin/permission-guard"

export default function AdminTeamPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    position: "",
    role: "Leader",
    email: "",
    phone: "",
    image: "/placeholder.svg?height=200&width=200",
  })

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
      return
    }
    loadTeamMembers()
  }, [user, router])

  const loadTeamMembers = () => {
    setTeamMembers(dataStore.getTeamMembers())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingMember) {
      dataStore.updateTeamMember(editingMember.id, formData)
    } else {
      dataStore.addTeamMember(formData as Omit<TeamMember, "id">)
    }
    resetForm()
    loadTeamMembers()
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData(member)
    setIsAddingMember(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      dataStore.deleteTeamMember(id)
      loadTeamMembers()
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      role: "Leader",
      email: "",
      phone: "",
      image: "/placeholder.svg?height=200&width=200",
    })
    setEditingMember(null)
    setIsAddingMember(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  if (!user) return <div>Loading...</div>

  const leaders = teamMembers.filter((member) => member.role === "Leader")
  const programOfficers = teamMembers.filter((member) => member.role === "Program Officer")

  return (
    <PermissionGuard resource="team" action="read">
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
                <h1 className="text-2xl font-bold text-gray-800">Manage Team Members</h1>
                <p className="text-gray-600">Add, edit, or remove core team members</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Add Member Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Team Members ({teamMembers.length})</h2>
              <p className="text-gray-600">Leaders: {leaders.length} • Program Officers: {programOfficers.length}</p>
            </div>

            {/* Dialog wrapper was missing previously; added here */}
            <Dialog open={isAddingMember} onOpenChange={(open) => setIsAddingMember(open)}>
              <PermissionGuard resource="team" action="create">
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </DialogTrigger>
              </PermissionGuard>

              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingMember ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
                  <DialogDescription>Fill in the details for the team member</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value as "Leader" | "Program Officer" }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Leader">Leader</SelectItem>
                        <SelectItem value="Program Officer">Program Officer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Profile Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">{editingMember ? "Update" : "Add"} Member</Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Leaders Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Leadership Team ({leaders.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
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
                  <div className="flex gap-2 mt-4">
                    <PermissionGuard resource="team" action="update">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(member)} className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </PermissionGuard>
                    <PermissionGuard resource="team" action="delete">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(member.id)}
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
        </div>

        {/* Program Officers Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Program Officers ({programOfficers.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programOfficers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
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
                  <div className="flex gap-2 mt-4">
                    <PermissionGuard resource="team" action="update">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(member)} className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </PermissionGuard>
                    <PermissionGuard resource="team" action="delete">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(member.id)}
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
        </div>

        {teamMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Team Members Yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first team member</p>
            <Button onClick={() => setIsAddingMember(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Member
            </Button>
          </div>
        )}
      </div>
    </PermissionGuard>
  )
}
