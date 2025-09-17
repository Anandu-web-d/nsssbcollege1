// Server-side data store for API routes
export interface TeamMember {
  id: string
  name: string
  position: string
  role: "Leader" | "Program Officer"
  email: string
  phone: string
  image: string
}

export interface Activity {
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
}

export interface Achievement {
  id: string
  title: string
  year: string
  level: "State Level" | "National Level" | "Regional Level" | "District Level"
  description: string
  category: "award" | "recognition" | "milestone"
  icon: string
  color: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  category: "Health" | "Education" | "Environment" | "Social Welfare"
  date: string
  activityId?: string
}

export interface MonthlyReport {
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

export interface BloodRequest {
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

