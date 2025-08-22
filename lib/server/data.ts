import { promises as fs } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {
    // no-op
  }
}

export async function readJson<T>(name: string, fallback: T): Promise<T> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, `${name}.json`)
  try {
    const raw = await fs.readFile(filePath, "utf8")
    return JSON.parse(raw) as T
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf8")
    return fallback
  }
}

export async function writeJson<T>(name: string, data: T): Promise<void> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, `${name}.json`)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8")
}



