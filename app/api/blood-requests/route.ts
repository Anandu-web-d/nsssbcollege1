import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/server/data"
import type { BloodRequest } from "@/lib/server-data-store"

type BloodRequestsFile = BloodRequest[]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const bloodGroup = searchParams.get("bloodGroup")
  
  const items = await readJson<BloodRequestsFile>("blood_requests", [])
  
  let filtered = items
  
  if (status) {
    filtered = filtered.filter((r) => r.status === status)
  }
  
  if (bloodGroup) {
    filtered = filtered.filter((r) => r.bloodGroup === bloodGroup)
  }
  
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return NextResponse.json(sorted)
}

export async function POST(req: Request) {
  const payload = (await req.json()) as Omit<BloodRequest, "id">
  const items = await readJson<BloodRequestsFile>("blood_requests", [])
  const newItem: BloodRequest = { 
    ...payload, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  items.push(newItem)
  await writeJson<BloodRequestsFile>("blood_requests", items)
  
  // Send email notification
  try {
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'blood-request',
        data: {
          ...payload,
          requestId: newItem.id
        }
      })
    })
    
    if (!emailResponse.ok) {
      console.error('Failed to send blood request email notification')
    }
  } catch (error) {
    console.error('Error sending blood request email:', error)
  }
  
  return NextResponse.json(newItem, { status: 201 })
}

