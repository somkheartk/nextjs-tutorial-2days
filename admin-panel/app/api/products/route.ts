import { NextResponse } from 'next/server'

// Mock database - In production, use a real database
let products = [
  { 
    id: 1, 
    name: 'Laptop Pro 15', 
    price: 1299.99, 
    category: 'Electronics',
    stock: 50,
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Wireless Mouse', 
    price: 29.99, 
    category: 'Accessories',
    stock: 200,
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Desk Lamp LED', 
    price: 45.00, 
    category: 'Furniture',
    stock: 0,
    status: 'inactive'
  },
  { 
    id: 4, 
    name: 'Mechanical Keyboard', 
    price: 89.99, 
    category: 'Accessories',
    stock: 75,
    status: 'active'
  },
  { 
    id: 5, 
    name: 'HD Monitor 27"', 
    price: 349.99, 
    category: 'Electronics',
    stock: 30,
    status: 'active'
  },
]

// GET /api/products - Get all products
export async function GET() {
  return NextResponse.json(products)
}

// POST /api/products - Create new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newProduct = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      ...body
    }
    products.push(newProduct)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
