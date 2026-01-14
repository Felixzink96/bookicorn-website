import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const VIEWS_FILE = path.join(process.cwd(), 'content/docs-views.json')

// Ensure views file exists
function ensureViewsFile() {
  if (!fs.existsSync(VIEWS_FILE)) {
    fs.writeFileSync(VIEWS_FILE, JSON.stringify({}), 'utf-8')
  }
}

// Get all views
function getViews(): Record<string, number> {
  ensureViewsFile()
  try {
    const data = fs.readFileSync(VIEWS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return {}
  }
}

// Save views
function saveViews(views: Record<string, number>) {
  fs.writeFileSync(VIEWS_FILE, JSON.stringify(views, null, 2), 'utf-8')
}

// Track a view
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
    }

    const views = getViews()
    views[slug] = (views[slug] || 0) + 1
    saveViews(views)

    return NextResponse.json({ success: true, views: views[slug] })
  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 })
  }
}

// Get all views
export async function GET() {
  try {
    const views = getViews()
    return NextResponse.json(views)
  } catch (error) {
    console.error('Error getting views:', error)
    return NextResponse.json({ error: 'Failed to get views' }, { status: 500 })
  }
}
