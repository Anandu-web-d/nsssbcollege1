import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/server/data"
import type { BloodRequest } from "@/lib/server-data-store"

type BloodRequestsFile = BloodRequest[]

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const updates = (await req.json()) as Partial<BloodRequest>
  const items = await readJson<BloodRequestsFile>("blood_requests", [])
  const idx = items.findIndex((r) => r.id === id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
  items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString() }
  await writeJson<BloodRequestsFile>("blood_requests", items)
  return NextResponse.json(items[idx])
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const items = await readJson<BloodRequestsFile>("blood_requests", [])
  const filtered = items.filter((r) => r.id !== id)
  await writeJson<BloodRequestsFile>("blood_requests", filtered)
  return NextResponse.json({ ok: true })
}