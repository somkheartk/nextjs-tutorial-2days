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

// GET /api/products/[id] - Get single product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = products.find(p => p.id === parseInt(id))
  
  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(product)
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const index = products.findIndex(p => p.id === parseInt(id))
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    products[index] = { ...products[index], ...body }
    return NextResponse.json(products[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const index = products.findIndex(p => p.id === parseInt(id))
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }
  
  products = products.filter(p => p.id !== parseInt(id))
  return NextResponse.json({ success: true })
}
