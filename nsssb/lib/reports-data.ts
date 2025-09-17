// This file contains the dynamic report data
// In a real application, this would come from a database or CMS

export interface MonthlyReportData {
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

export const monthlyReports: MonthlyReportData[] = [
  {
    id: "jan-2024",
    month: "January",
    year: "2024",
    title: "January 2024 Monthly Report",
    pdfUrl: "/placeholder.pdf", // Replace with actual PDF URL
    summary:
      "Successfully completed 7 major activities with 565 total participants across health, education, environment, and social welfare domains.",
    totalActivities: 7,
    totalParticipants: 565,
    totalVolunteers: 45,
    budgetUtilized: "₹25,000",
    uploadDate: "2024-02-01",
    fileSize: "2.3 MB",
  },
  {
    id: "feb-2024",
    month: "February",
    year: "2024",
    title: "February 2024 Monthly Report",
    pdfUrl: "/placeholder.pdf", // Replace with actual PDF URL
    summary:
      "Executed 7 diverse programs focusing on women empowerment, education, and health with 645 total participants.",
    totalActivities: 7,
    totalParticipants: 645,
    totalVolunteers: 52,
    budgetUtilized: "₹28,500",
    uploadDate: "2024-03-01",
    fileSize: "2.8 MB",
  },
  {
    id: "mar-2024",
    month: "March",
    year: "2024",
    title: "March 2024 Monthly Report",
    pdfUrl: "/placeholder.pdf", // Replace with actual PDF URL
    summary:
      "Completed 7 impactful activities with focus on water conservation, health awareness, and skill development reaching 475 participants.",
    totalActivities: 7,
    totalParticipants: 475,
    totalVolunteers: 48,
    budgetUtilized: "₹22,000",
    uploadDate: "2024-04-01",
    fileSize: "2.1 MB",
  },
  {
    id: "apr-2024",
    month: "April",
    year: "2024",
    title: "April 2024 Monthly Report",
    pdfUrl: "/placeholder.pdf", // Replace with actual PDF URL
    summary:
      "Organized 8 comprehensive activities focusing on community health, environmental sustainability, and educational outreach with 520 participants.",
    totalActivities: 8,
    totalParticipants: 520,
    totalVolunteers: 50,
    budgetUtilized: "₹26,800",
    uploadDate: "2024-05-01",
    fileSize: "2.5 MB",
  },
  {
    id: "may-2024",
    month: "May",
    year: "2024",
    title: "May 2024 Monthly Report",
    pdfUrl: "/placeholder.pdf", // Replace with actual PDF URL
    summary:
      "Successfully conducted 9 activities with emphasis on rural development, digital literacy, and health awareness reaching 680 participants.",
    totalActivities: 9,
    totalParticipants: 680,
    totalVolunteers: 55,
    budgetUtilized: "₹31,200",
    uploadDate: "2024-06-01",
    fileSize: "3.1 MB",
  },
  {
    id: "jun-2024",
    month: "June",
    year: "2024",
    title: "June 2024 Monthly Report",
    pdfUrl: "/placeholder.pdf", // Replace with actual PDF URL
    summary:
      "Completed 6 focused activities during summer break, concentrating on community service and volunteer training with 380 participants.",
    totalActivities: 6,
    totalParticipants: 380,
    totalVolunteers: 42,
    budgetUtilized: "₹18,500",
    uploadDate: "2024-07-01",
    fileSize: "1.9 MB",
  },
]

// Helper function to get report by month and year
export function getReportByMonth(month: string, year = "2024"): MonthlyReportData | undefined {
  return monthlyReports.find((report) => report.month.toLowerCase() === month.toLowerCase() && report.year === year)
}

// Helper function to get all reports for a year
export function getReportsByYear(year = "2024"): MonthlyReportData[] {
  return monthlyReports.filter((report) => report.year === year)
}
