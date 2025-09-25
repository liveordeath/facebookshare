import { NextRequest, NextResponse } from 'next/server'

// In-memory storage cho analytics (có thể thay bằng database sau này)
let analyticsData = {
  totalVisits: 0,
  dailyVisits: {} as Record<string, number>,
  urlVisits: {} as Record<string, number>,
  lastReset: new Date().toISOString()
}

// Lấy ngày hiện tại theo format YYYY-MM-DD
function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

// GET: Lấy thống kê analytics
export async function GET() {
  try {
    const today = getCurrentDate()
    
    // Đảm bảo có dữ liệu cho ngày hôm nay
    if (!analyticsData.dailyVisits[today]) {
      analyticsData.dailyVisits[today] = 0
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
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error recording analytics:', error)
    return NextResponse.json({ error: 'Failed to record analytics' }, { status: 500 })
  }
}

// DELETE: Reset analytics
export async function DELETE() {
  try {
    analyticsData = {
      totalVisits: 0,
      dailyVisits: {},
      urlVisits: {},
      lastReset: new Date().toISOString()
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resetting analytics:', error)
    return NextResponse.json({ error: 'Failed to reset analytics' }, { status: 500 })
  }
}
