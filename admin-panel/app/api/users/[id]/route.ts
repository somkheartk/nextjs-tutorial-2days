import { NextResponse } from 'next/server'

// Mock database - In production, use a real database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'moderator', status: 'inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'user', status: 'active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', status: 'active' },
]

// GET /api/users/[id] - Get single user
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const user = users.find(u => u.id === parseInt(id))
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(user)
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const index = users.findIndex(u => u.id === parseInt(id))
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    users[index] = { ...users[index], ...body }
    return NextResponse.json(users[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const index = users.findIndex(u => u.id === parseInt(id))
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  users = users.filter(u => u.id !== parseInt(id))
  return NextResponse.json({ success: true })
}
