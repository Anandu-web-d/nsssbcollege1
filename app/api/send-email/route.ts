import { NextResponse } from "next/server"
import { sendBloodRequestEmail, sendContactEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, data } = body

    if (type === 'blood-request') {
      const result = await sendBloodRequestEmail(data)
      if (result.success) {
        return NextResponse.json({ success: true, message: 'Blood request email sent successfully' })
      } else {
        return NextResponse.json({ success: false, error: result.error }, { status: 500 })
      }
    } else if (type === 'contact') {
      const result = await sendContactEmail(data)
      if (result.success) {
        return NextResponse.json({ success: true, message: 'Contact email sent successfully' })
      } else {
        return NextResponse.json({ success: false, error: result.error }, { status: 500 })
      }
    } else {
      return NextResponse.json({ success: false, error: 'Invalid email type' }, { status: 400 })
    }
  } catch (error) {
    console.error('Email API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send email' 
    }, { status: 500 })
  }
}
