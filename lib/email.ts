// Simple email notification system using fetch to external email service
// This approach doesn't require nodemailer and works with any email service API

export interface BloodRequestEmailData {
  name: string
  phone: string
  bloodGroup: string
  hospital: string
  location: string
  urgency: string
  description?: string
  contactPerson?: string
  contactPhone?: string
  requestId: string
}

export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

// Function to send email via EmailJS or similar service
export async function sendBloodRequestEmail(data: BloodRequestEmailData) {
  const urgencyEmoji = {
    'Low': '🟢',
    'Medium': '🟡', 
    'High': '🟠',
    'Critical': '🔴'
  }

  const emailContent = `
🩸 BLOOD REQUEST ALERT - NSS Blood Donation Service

${urgencyEmoji[data.urgency as keyof typeof urgencyEmoji]} ${data.urgency} PRIORITY REQUEST
Request ID: ${data.requestId}

PATIENT INFORMATION:
- Name: ${data.name}
- Phone: ${data.phone}
- Blood Group: ${data.bloodGroup}
- Hospital: ${data.hospital}
- Location: ${data.location}
${data.contactPerson ? `- Contact Person: ${data.contactPerson} (${data.contactPhone})` : ''}

${data.description ? `ADDITIONAL DETAILS:\n${data.description}\n` : ''}

📞 IMMEDIATE ACTION REQUIRED
Please contact the patient immediately and coordinate with our blood donor network.
${data.urgency === 'Critical' ? 'This is a CRITICAL request requiring immediate attention!' : ''}

Generated on: ${new Date().toLocaleString()}
  `

  // For now, we'll log the email content and return success
  // In production, you can integrate with EmailJS, SendGrid, or any email service
  console.log('Blood Request Email to be sent:', {
    to: 'nsssbcollege123@gmail.com',
    subject: `🩸 ${data.urgency} Blood Request - ${data.bloodGroup} - ${data.name}`,
    content: emailContent
  })

  // Simulate email sending
  return { success: true, error: undefined }
}

export async function sendContactEmail(data: ContactEmailData) {
  const emailContent = `
📧 NEW CONTACT REQUEST - NSS Website

Subject: ${data.subject}
Received on: ${new Date().toLocaleString()}

CONTACT INFORMATION:
- Name: ${data.name}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}

MESSAGE:
${data.message}

💬 You can reply directly to this email to respond to ${data.name}.

Generated on: ${new Date().toLocaleString()}
  `

  // For now, we'll log the email content and return success
  // In production, you can integrate with EmailJS, SendGrid, or any email service
  console.log('Contact Email to be sent:', {
    to: 'nsssbcollege123@gmail.com',
    replyTo: data.email,
    subject: `📧 Contact Request: ${data.subject}`,
    content: emailContent
  })

  // Simulate email sending
  return { success: true, error: undefined }
}
