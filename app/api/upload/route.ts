import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop() || 'jpg'
    const filename = `uploaded-${timestamp}.${extension}`
    
    // Create public/images directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public', 'images')
    await mkdir(publicDir, { recursive: true })
    
    // Save file to public directory
    const filepath = path.join(publicDir, filename)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    // Return public URL
    const publicUrl = `/images/${filename}`
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename,
      type: file.type,
      size: file.size
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
