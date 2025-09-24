import { NextRequest, NextResponse } from 'next/server'
import { redirectConfig, urlList } from '../../config/redirect'
import { promises as fs } from 'fs'
import path from 'path'

// File để lưu config (trong production nên dùng database)
const CONFIG_FILE = path.join(process.cwd(), 'config-data.json')

// Đọc config từ file
async function readConfig() {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading config:', error)
    return { config: redirectConfig, urls: urlList }
  }
}

// Ghi config vào file
async function writeConfig(data: any) {
  try {
    await fs.writeFile(CONFIG_FILE, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing config:', error)
    return false
  }
}

// GET: Lấy config
export async function GET() {
  try {
    const data = await readConfig()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 })
  }
}

// POST: Cập nhật config
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { config, urls } = body
    
    const data = { config, urls, updatedAt: new Date().toISOString() }
    
    if (await writeConfig(data)) {
      return NextResponse.json({ success: true, data })
    } else {
      return NextResponse.json({ error: 'Failed to save config' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
