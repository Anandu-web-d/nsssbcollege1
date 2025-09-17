"use client"

// Dynamic data store for all website content
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

// Initial data
const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    position: "NSS Program Coordinator",
    role: "Leader",
    email: "rajesh@college.edu",
    phone: "+91 9876543210",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Priya Sharma",
    position: "Assistant Coordinator",
    role: "Leader",
    email: "priya@college.edu",
    phone: "+91 9876543211",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Amit Patel",
    position: "Student Leader",
    role: "Leader",
    email: "amit@student.edu",
    phone: "+91 9876543212",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    position: "Student Leader",
    role: "Leader",
    email: "sneha@student.edu",
    phone: "+91 9876543213",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Vikram Singh",
    position: "Activity Coordinator",
    role: "Leader",
    email: "vikram@student.edu",
    phone: "+91 9876543214",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Kavya Nair",
    position: "Community Outreach Leader",
    role: "Leader",
    email: "kavya@student.edu",
    phone: "+91 9876543215",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "7",
    name: "Arjun Mehta",
    position: "Program Officer - Health",
    role: "Program Officer",
    email: "arjun@student.edu",
    phone: "+91 9876543216",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "8",
    name: "Riya Gupta",
    position: "Program Officer - Education",
    role: "Program Officer",
    email: "riya@student.edu",
    phone: "+91 9876543217",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "9",
    name: "Karan Joshi",
    position: "Program Officer - Environment",
    role: "Program Officer",
    email: "karan@student.edu",
    phone: "+91 9876543218",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "10",
    name: "Ananya Das",
    position: "Program Officer - Social Welfare",
    role: "Program Officer",
    email: "ananya@student.edu",
    phone: "+91 9876543219",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "11",
    name: "Rohit Verma",
    position: "Program Officer - Rural Development",
    role: "Program Officer",
    email: "rohit@student.edu",
    phone: "+91 9876543220",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const initialActivities: Activity[] = [
  {
    id: "1",
    title: "Blood Donation Camp",
    date: "January 5, 2024",
    location: "College Campus",
    participants: 150,
    description: "Organized blood donation camp in collaboration with Red Cross Society",
    category: "Health",
    month: "January",
    year: "2024",
  },
  {
    id: "2",
    title: "Digital Literacy Program",
    date: "January 12, 2024",
    location: "Rural Community Center",
    participants: 45,
    description: "Computer literacy classes for rural community members",
    category: "Education",
    month: "January",
    year: "2024",
  },
  {
    id: "3",
    title: "Tree Plantation Drive",
    date: "January 18, 2024",
    location: "College Campus & Nearby Areas",
    participants: 80,
    description: "Planted 500+ saplings to promote environmental conservation",
    category: "Environment",
    month: "January",
    year: "2024",
  },
]

const initialAchievements: Achievement[] = [
  {
    id: "1",
    title: "Best NSS Unit Award",
    year: "2023",
    level: "State Level",
    description: "Recognized as the best NSS unit in the state for outstanding community service",
    category: "award",
    icon: "trophy",
    color: "text-yellow-600",
  },
  {
    id: "2",
    title: "Excellence in Social Service",
    year: "2023",
    level: "National Level",
    description: "National recognition for exceptional contribution to social welfare activities",
    category: "award",
    icon: "award",
    color: "text-blue-600",
  },
]

const initialGalleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Blood Donation Camp",
    title: "Blood Donation Camp - January 2024",
    category: "Health",
    date: "January 5, 2024",
    activityId: "1",
  },
  {
    id: "2",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Digital Literacy Program",
    title: "Digital Literacy Training",
    category: "Education",
    date: "January 12, 2024",
    activityId: "2",
  },
]

const initialReports: MonthlyReport[] = [
  {
    id: "jan-2024",
    month: "January",
    year: "2024",
    title: "January 2024 Monthly Report",
    pdfUrl: "/placeholder.pdf",
    summary: "Successfully completed 7 major activities with 565 total participants",
    totalActivities: 7,
    totalParticipants: 565,
    totalVolunteers: 45,
    budgetUtilized: "₹25,000",
    uploadDate: "2024-02-01",
    fileSize: "2.3 MB",
  },
]

// Data management functions
class DataStore {
  private getStorageKey(type: string): string {
    return `nss_${type}`
  }

  private getData<T>(type: string, initialData: T[]): T[] {
    if (typeof window === "undefined") return initialData
    const stored = localStorage.getItem(this.getStorageKey(type))
    return stored ? JSON.parse(stored) : initialData
  }

  private setData<T>(type: string, data: T[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.getStorageKey(type), JSON.stringify(data))
  }

  // Team Members
  getTeamMembers(): TeamMember[] {
    return this.getData("team_members", initialTeamMembers)
  }

  addTeamMember(member: Omit<TeamMember, "id">): TeamMember {
    const members = this.getTeamMembers()
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString(),
    }
    const updatedMembers = [...members, newMember]
    this.setData("team_members", updatedMembers)
    return newMember
  }

  updateTeamMember(id: string, updates: Partial<TeamMember>): void {
    const members = this.getTeamMembers()
    const updatedMembers = members.map((member) => (member.id === id ? { ...member, ...updates } : member))
    this.setData("team_members", updatedMembers)
  }

  deleteTeamMember(id: string): void {
    const members = this.getTeamMembers()
    const updatedMembers = members.filter((member) => member.id !== id)
    this.setData("team_members", updatedMembers)
  }

  // Activities
  getActivities(): Activity[] {
    return this.getData("activities", initialActivities)
  }

  addActivity(activity: Omit<Activity, "id">): Activity {
    const activities = this.getActivities()
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
    }
    const updatedActivities = [...activities, newActivity]
    this.setData("activities", updatedActivities)
    return newActivity
  }

  updateActivity(id: string, updates: Partial<Activity>): void {
    const activities = this.getActivities()
    const updatedActivities = activities.map((activity) => (activity.id === id ? { ...activity, ...updates } : activity))
    this.setData("activities", updatedActivities)
  }

  deleteActivity(id: string): void {
    const activities = this.getActivities()
    const updatedActivities = activities.filter((activity) => activity.id !== id)
    this.setData("activities", updatedActivities)
  }

  // Achievements
  getAchievements(): Achievement[] {
    return this.getData("achievements", initialAchievements)
  }

  addAchievement(achievement: Omit<Achievement, "id">): Achievement {
    const achievements = this.getAchievements()
    const newAchievement: Achievement = {
      ...achievement,
      id: Date.now().toString(),
    }
    const updatedAchievements = [...achievements, newAchievement]
    this.setData("achievements", updatedAchievements)
    return newAchievement
  }

  updateAchievement(id: string, updates: Partial<Achievement>): void {
    const achievements = this.getAchievements()
    const updatedAchievements = achievements.map((achievement) =>
      achievement.id === id ? { ...achievement, ...updates } : achievement
    )
    this.setData("achievements", updatedAchievements)
  }

  deleteAchievement(id: string): void {
    const achievements = this.getAchievements()
    const updatedAchievements = achievements.filter((achievement) => achievement.id !== id)
    this.setData("achievements", updatedAchievements)
  }

  // Gallery Images
  getGalleryImages(): GalleryImage[] {
    return this.getData("gallery_images", initialGalleryImages)
  }

  addGalleryImage(image: Omit<GalleryImage, "id">): GalleryImage {
    const images = this.getGalleryImages()
    const newImage: GalleryImage = {
      ...image,
      id: Date.now().toString(),
    }
    const updatedImages = [...images, newImage]
    this.setData("gallery_images", updatedImages)
    return newImage
  }

  updateGalleryImage(id: string, updates: Partial<GalleryImage>): void {
    const images = this.getGalleryImages()
    const updatedImages = images.map((image) => (image.id === id ? { ...image, ...updates } : image))
    this.setData("gallery_images", updatedImages)
  }

  deleteGalleryImage(id: string): void {
    const images = this.getGalleryImages()
    const updatedImages = images.filter((image) => image.id !== id)
    this.setData("gallery_images", updatedImages)
  }

  // Monthly Reports
  getReports(): MonthlyReport[] {
    return this.getData("reports", initialReports)
  }

  addReport(report: Omit<MonthlyReport, "id">): MonthlyReport {
    const reports = this.getReports()
    const newReport: MonthlyReport = {
      ...report,
      id: Date.now().toString(),
    }
    const updatedReports = [...reports, newReport]
    this.setData("reports", updatedReports)
    return newReport
  }

  updateReport(id: string, updates: Partial<MonthlyReport>): void {
    const reports = this.getReports()
    const updatedReports = reports.map((report) => (report.id === id ? { ...report, ...updates } : report))
    this.setData("reports", updatedReports)
  }

  deleteReport(id: string): void {
    const reports = this.getReports()
    const updatedReports = reports.filter((report) => report.id !== id)
    this.setData("reports", updatedReports)
  }

  // Blood Requests
  getBloodRequests(): BloodRequest[] {
    return this.getData("blood_requests", [])
  }

  addBloodRequest(request: Omit<BloodRequest, "id">): BloodRequest {
    const requests = this.getBloodRequests()
    const newRequest: BloodRequest = {
      ...request,
      id: Date.now().toString(),
    }
    const updatedRequests = [...requests, newRequest]
    this.setData("blood_requests", updatedRequests)
    return newRequest
  }

  updateBloodRequest(id: string, updates: Partial<BloodRequest>): void {
    const requests = this.getBloodRequests()
    const updatedRequests = requests.map((request) => 
      request.id === id ? { ...request, ...updates, updatedAt: new Date().toISOString() } : request
    )
    this.setData("blood_requests", updatedRequests)
  }

  deleteBloodRequest(id: string): void {
    const requests = this.getBloodRequests()
    const updatedRequests = requests.filter((request) => request.id !== id)
    this.setData("blood_requests", updatedRequests)
  }
}

export const dataStore = new DataStore()
