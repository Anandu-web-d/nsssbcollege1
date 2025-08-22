import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/server/data"
import type { Activity } from "@/lib/data-store"

type ActivitiesFile = Activity[]

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const updates = (await req.json()) as Partial<Activity>
  const items = await readJson<ActivitiesFile>("activities", [])
  const idx = items.findIndex((a) => a.id === id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
  items[idx] = { ...items[idx], ...updates }
  await writeJson<ActivitiesFile>("activities", items)
  return NextResponse.json(items[idx])
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const items = await readJson<ActivitiesFile>("activities", [])
  const filtered = items.filter((a) => a.id !== id)
  await writeJson<ActivitiesFile>("activities", filtered)
  return NextResponse.json({ ok: true })
}



