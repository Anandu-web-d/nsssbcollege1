import { promises as fs } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

export async function readJson<T>(filename: string, defaultValue: T): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, `${filename}.json`)
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
  } catch {
    return defaultValue
  }
}

export async function writeJson<T>(filename: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  const filePath = path.join(DATA_DIR, `${filename}.json`)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}