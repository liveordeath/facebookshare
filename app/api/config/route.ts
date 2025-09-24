import { NextRequest, NextResponse } from 'next/server'
import { redirectConfig, urlList } from '../../config/redirect'
import { writeFile, readFile, mkdir } from 'fs/promises'
import path from 'path'

// File để lưu config
const CONFIG_FILE = path.join(process.cwd(), 'config-data.json')

// Đọc config từ file
async function readConfig() {
  try {
    const data = await readFile(CONFIG_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading config:', error)
    return { 
      config: redirectConfig, 
      urls: urlList,
      pageSettings: {
        title: ':) Muốn cuộc sống cân bằng hãy làm theo tips này',
        image: '/images/image.png'
      }
    }
  }
}

// Ghi config vào file
async function writeConfig(data: any) {
  try {
    await writeFile(CONFIG_FILE, JSON.stringify(data, null, 2))
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
    console.error('Error reading config:', error)
    return NextResponse.json({ error: 'Failed to read config', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

// POST: Cập nhật config
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { config, urls, pageSettings } = body
    
    const data = { 
      config, 
      urls, 
      pageSettings: pageSettings || {
        title: ':) Muốn cuộc sống cân bằng hãy làm theo tips này',
        image: '/images/image.png'
      }
    }
    
    if (await writeConfig(data)) {
      return NextResponse.json({ success: true, data: await readConfig() })
    } else {
      return NextResponse.json({ error: 'Failed to save config' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error saving config:', error)
    return NextResponse.json({ error: 'Invalid request', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 })
  }
}
