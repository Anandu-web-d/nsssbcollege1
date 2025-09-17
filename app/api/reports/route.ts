import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/server/data"
import type { MonthlyReport } from "@/lib/server-data-store"

type ReportsFile = MonthlyReport[]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get("year") ?? undefined
  const items = await readJson<ReportsFile>("reports", [])
  const filtered = year ? items.filter((r) => r.year === year) : items
  const sorted = [...filtered].sort((a, b) => a.month.localeCompare(b.month))
  return NextResponse.json(sorted)
}

export async function POST(req: Request) {
  const payload = (await req.json()) as Omit<MonthlyReport, "id">
  const items = await readJson<ReportsFile>("reports", [])
  const newItem: MonthlyReport = { ...payload, id: Date.now().toString() }
  items.push(newItem)
  await writeJson<ReportsFile>("reports", items)
  return NextResponse.json(newItem, { status: 201 })
}



