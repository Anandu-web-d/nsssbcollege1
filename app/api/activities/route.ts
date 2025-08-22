import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/server/data"
import type { Activity } from "@/lib/data-store"

type ActivitiesFile = Activity[]

export async function GET() {
  const items = await readJson<ActivitiesFile>("activities", [])
  const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return NextResponse.json(sorted)
}

export async function POST(req: Request) {
  const payload = (await req.json()) as Omit<Activity, "id">
  const items = await readJson<ActivitiesFile>("activities", [])
  const newItem: Activity = { ...payload, id: Date.now().toString() }
  items.push(newItem)
  await writeJson<ActivitiesFile>("activities", items)
  return NextResponse.json(newItem, { status: 201 })
}



