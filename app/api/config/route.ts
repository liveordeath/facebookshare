import { NextRequest, NextResponse } from 'next/server'
import { redirectConfig, urlList } from '../../config/redirect'

// In-memory storage (for Vercel compatibility)
let configData = {
  config: redirectConfig,
  urls: urlList,
  pageSettings: {
    title: ':) Muốn cuộc sống cân bằng hãy làm theo tips này',
    image: 'https://picsum.photos/1200/630?random=1'
  },
  updatedAt: new Date().toISOString()
}

// Đọc config từ memory
function readConfig() {
  return configData
}

// Ghi config vào memory
function writeConfig(data: any) {
  try {
    configData = { ...data, updatedAt: new Date().toISOString() }
    return true
  } catch (error) {
    console.error('Error writing config:', error)
    return false
  }
}

// GET: Lấy config
export async function GET() {
  try {
    const data = readConfig()
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
        image: 'https://picsum.photos/1200/630?random=1'
      }
    }
    
    if (writeConfig(data)) {
      return NextResponse.json({ success: true, data: readConfig() })
    } else {
      return NextResponse.json({ error: 'Failed to save config' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error saving config:', error)
    return NextResponse.json({ error: 'Invalid request', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 })
  }
}
