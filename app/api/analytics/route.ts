import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// File path để lưu analytics data
const ANALYTICS_FILE = path.join(process.cwd(), 'analytics-data.json')

// Default analytics data
const defaultAnalyticsData = {
  totalVisits: 0,
  dailyVisits: {} as Record<string, number>,
  urlVisits: {} as Record<string, number>,
  lastReset: new Date().toISOString()
}

// Đọc analytics data từ file
async function readAnalyticsData() {
  try {
    const data = await fs.readFile(ANALYTICS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // Nếu file không tồn tại, tạo file mới với data mặc định
    await writeAnalyticsData(defaultAnalyticsData)
    return defaultAnalyticsData
  }
}

// Ghi analytics data vào file
async function writeAnalyticsData(data: any) {
  try {
    await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing analytics data:', error)
    return false
  }
}

// Lấy ngày hiện tại theo format YYYY-MM-DD
function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

// GET: Lấy thống kê analytics
export async function GET() {
  try {
    const analyticsData = await readAnalyticsData()
    const today = getCurrentDate()
    
    // Đảm bảo có dữ liệu cho ngày hôm nay
    if (!analyticsData.dailyVisits[today]) {
      analyticsData.dailyVisits[today] = 0
      await writeAnalyticsData(analyticsData)
    }
    
    return NextResponse.json({
      totalVisits: analyticsData.totalVisits,
      dailyVisits: analyticsData.dailyVisits,
      urlVisits: analyticsData.urlVisits,
      lastReset: analyticsData.lastReset,
      todayVisits: analyticsData.dailyVisits[today] || 0
    })
  } catch (error) {
    console.error('Error getting analytics:', error)
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 })
  }
}

// POST: Ghi nhận lượt truy cập
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, url } = body // type: 'page' hoặc 'redirect', url: URL được redirect
    
    const analyticsData = await readAnalyticsData()
    const today = getCurrentDate()
    
    // Tăng tổng lượt truy cập
    analyticsData.totalVisits++
    
    // Tăng lượt truy cập theo ngày
    if (!analyticsData.dailyVisits[today]) {
      analyticsData.dailyVisits[today] = 0
    }
    analyticsData.dailyVisits[today]++
    
    // Nếu là redirect, tăng lượt truy cập cho URL đó
    if (type === 'redirect' && url) {
      if (!analyticsData.urlVisits[url]) {
        analyticsData.urlVisits[url] = 0
      }
      analyticsData.urlVisits[url]++
    }
    
    // Lưu dữ liệu vào file
    await writeAnalyticsData(analyticsData)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error recording analytics:', error)
    return NextResponse.json({ error: 'Failed to record analytics' }, { status: 500 })
  }
}

// DELETE: Reset analytics
export async function DELETE() {
  try {
    const resetData = {
      totalVisits: 0,
      dailyVisits: {},
      urlVisits: {},
      lastReset: new Date().toISOString()
    }
    
    await writeAnalyticsData(resetData)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resetting analytics:', error)
    return NextResponse.json({ error: 'Failed to reset analytics' }, { status: 500 })
  }
}
