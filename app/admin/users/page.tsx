"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, ArrowLeft, Users, Mail, Calendar, Shield } from 'lucide-react'
import { useState, useEffect } from "react"
import { useAuth, type User, type UserRole, getRoleDisplayName, DEFAULT_PERMISSIONS } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import PermissionGuard from "@/components/admin/permission-guard"
import RoleBadge from "@/components/admin/role-badge"

// Mock users data store
const MOCK_USERS_STORE = "nss_users_store"

export default function AdminUsersPage() {
  const { user, canAccess } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<Partial<User>>({
    username: "",
    email: "",
    role: "viewer",
    isActive: true,
  })

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
      return
    }
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router])

  const loadUsers = () => {
    try {
      const stored = localStorage.getItem(MOCK_USERS_STORE)
      if (stored) {
        setUsers(JSON.parse(stored))
      } else {
        // Initialize with default users (use safe access to DEFAULT_PERMISSIONS)
        const defaultUsers: User[] = [
          {
            id: "1",
            username: "superadmin",
            email: "superadmin@nss.edu",
            role: "super_admin",
            permissions: DEFAULT_PERMISSIONS?.super_admin ?? [],
            createdAt: "2024-01-01",
            lastLogin: "2024-01-15",
            isActive: true,
          },
          {
            id: "2",
            username: "admin",
            email: "admin@nss.edu",
            role: "admin",
            permissions: DEFAULT_PERMISSIONS?.admin ?? [],
            createdAt: "2024-01-01",
            lastLogin: "2024-01-14",
            isActive: true,
          },
          {
            id: "3",
            username: "editor",
            email: "editor@nss.edu",
            role: "editor",
            permissions: DEFAULT_PERMISSIONS?.editor ?? [],
            createdAt: "2024-01-01",
            lastLogin: "2024-01-13",
            isActive: true,
          },
          {
            id: "4",
            username: "viewer",
            email: "viewer@nss.edu",
            role: "viewer",
            permissions: DEFAULT_PERMISSIONS?.viewer ?? [],
            createdAt: "2024-01-01",
            lastLogin: "2024-01-12",
            isActive: true,
          },
        ]
        setUsers(defaultUsers)
        localStorage.setItem(MOCK_USERS_STORE, JSON.stringify(defaultUsers))
      }
    } catch (err) {
      console.error("Failed to load users from localStorage", err)
      setUsers([])
    }
  }

  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers)
    try {
      localStorage.setItem(MOCK_USERS_STORE, JSON.stringify(updatedUsers))
    } catch (err) {
      console.error("Failed to save users to localStorage", err)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingUser) {
      const updatedUsers = users.map(u => 
        u.id === editingUser.id 
          ? { 
              ...u, 
              ...formData, 
              permissions: DEFAULT_PERMISSIONS?.[formData.role as UserRole] ?? u.permissions 
            }
          : u
      )
      saveUsers(updatedUsers)
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        username: formData.username ?? "",
        email: formData.email ?? "",
        role: (formData.role as UserRole) ?? ("viewer" as UserRole),
        permissions: DEFAULT_PERMISSIONS?.[formData.role as UserRole] ?? [],
        createdAt: new Date().toISOString(),
        // lastLogin may be optional in your type; default to empty string if not provided
        lastLogin: "",
        isActive: formData.isActive ?? true,
      }
      saveUsers([...users, newUser])
    }
    
    resetForm()
  }

  const handleEdit = (userToEdit: User) => {
    setEditingUser(userToEdit)
    setFormData({
      username: userToEdit.username,
      email: userToEdit.email,
      role: userToEdit.role,
      isActive: userToEdit.isActive,
    })
    setIsAddingUser(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter(u => u.id !== id)
      saveUsers(updatedUsers)
    }
  }

  const handleToggleActive = (id: string) => {
    const updatedUsers = users.map(u => 
      u.id === id ? { ...u, isActive: !u.isActive } : u
    )
    saveUsers(updatedUsers)
  }

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      role: "viewer",
      isActive: true,
    })
    setEditingUser(null)
    setIsAddingUser(false)
  }

  const getRoleStats = () => {
    const stats = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1
      return acc
    }, {} as Record<UserRole, number>)
    
    return [
      { role: "super_admin", count: stats.super_admin || 0, color: "text-red-600" },
      { role: "admin", count: stats.admin || 0, color: "text-blue-600" },
      { role: "editor", count: stats.editor || 0, color: "text-green-600" },
      { role: "viewer", count: stats.viewer || 0, color: "text-gray-600" },
    ]
  }

  if (!user) return <div>Loading...</div>

  return (
    <PermissionGuard resource="users" action="read">
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
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-600">Manage user accounts and permissions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Role Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {getRoleStats().map((stat) => (
              <Card key={stat.role}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {getRoleDisplayName(stat.role as UserRole)}
                  </CardTitle>
                  <Shield className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <p className="text-xs text-muted-foreground">Active users</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Users Management */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Users ({users.length})</h2>
              <p className="text-gray-600">Manage user accounts and their permissions</p>
            </div>
            
            <PermissionGuard resource="users" action="create">
              <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsAddingUser(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
                    <DialogDescription>
                      {editingUser ? "Update user information and permissions" : "Create a new user account"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                        required
                        disabled={!!editingUser}
                      />
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
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        value={formData.role} 
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value as UserRole }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {canAccess && canAccess("super_admin") && (
                            <SelectItem value="super_admin">Super Admin</SelectItem>
                          )}
                          {canAccess && canAccess("admin") && (
                            <SelectItem value="admin">Admin</SelectItem>
                          )}
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={!!formData.isActive}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: !!checked }))}
                      />
                      <Label htmlFor="isActive">Active Account</Label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">{editingUser ? "Update" : "Create"} User</Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </PermissionGuard>
          </div>

          {/* Users Table */}
          <div className="grid grid-cols-1 gap-4">
            {users.map((userItem) => (
              <Card key={userItem.id} className={`hover:shadow-lg transition-shadow ${!userItem.isActive ? 'opacity-60' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {userItem.username?.charAt(0)?.toUpperCase() ?? ""}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{userItem.username}</h3>
                          <RoleBadge role={userItem.role} />
                          {!userItem.isActive && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Inactive</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {userItem.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Joined {userItem.createdAt ? new Date(userItem.createdAt).toLocaleDateString() : "—"}
                          </div>
                          {userItem.lastLogin && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              Last login {new Date(userItem.lastLogin).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <PermissionGuard resource="users" action="update">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(userItem.id)}
                          className={userItem.isActive ? "text-orange-600" : "text-green-600"}
                        >
                          {userItem.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </PermissionGuard>

                      <PermissionGuard resource="users" action="update">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(userItem)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </PermissionGuard>

                      <PermissionGuard resource="users" action="delete">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(userItem.id)}
                          className="text-red-600 hover:text-red-700"
                          disabled={userItem.id === user?.id}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </PermissionGuard>
                    </div>
                  </div>

                  {/* Permissions Preview */}
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {(userItem.permissions ?? []).map((permission, index) => (
                        <div key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {permission.resource ? `${permission.resource}: ${permission.actions?.join(", ") ?? ""}` : String(permission)}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Users Found</h3>
              <p className="text-gray-500 mb-4">Start by adding your first user</p>
              <PermissionGuard resource="users" action="create">
                <Button onClick={() => setIsAddingUser(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First User
                </Button>
              </PermissionGuard>
            </div>
          )}
        </div>
      </div>
    </PermissionGuard>
  )
}
