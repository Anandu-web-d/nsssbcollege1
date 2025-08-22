import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/server/data"
import type { MonthlyReport } from "@/lib/data-store"

type ReportsFile = MonthlyReport[]

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const updates = (await req.json()) as Partial<MonthlyReport>
  const items = await readJson<ReportsFile>("reports", [])
  const idx = items.findIndex((r) => r.id === id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
  items[idx] = { ...items[idx], ...updates }
  await writeJson<ReportsFile>("reports", items)
  return NextResponse.json(items[idx])
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const items = await readJson<ReportsFile>("reports", [])
  const filtered = items.filter((r) => r.id !== id)
  await writeJson<ReportsFile>("reports", filtered)
  return NextResponse.json({ ok: true })
}



