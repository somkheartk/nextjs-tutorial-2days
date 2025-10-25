import { NextResponse } from 'next/server'

// Mock database - In production, use a real database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'moderator', status: 'inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'user', status: 'active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', status: 'active' },
]

// GET /api/users - Get all users
export async function GET() {
  return NextResponse.json(users)
}

// POST /api/users - Create new user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      ...body
    }
    users.push(newUser)
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
