import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Demo authentication - In production, validate against database
    if (email === 'admin@example.com' && password === 'password') {
      return NextResponse.json({
        success: true,
        token: 'demo-token-' + Date.now(),
        user: { 
          email, 
          name: 'Admin User',
          role: 'admin'
        }
      })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}
