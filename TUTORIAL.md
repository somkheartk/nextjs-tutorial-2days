# สอน Next.js ใน 2 วัน: สร้าง Admin Panel แบบครบวงจร

## 📚 บทนำ

ยินดีต้อนรับสู่คอร์สเรียน Next.js แบบเข้มข้น 2 วัน! คอร์สนี้จะพาคุณจากการไม่รู้จัก Next.js ไปสู่การสร้าง Admin Panel ที่สมบูรณ์และพร้อมใช้งาน

### เป้าหมายการเรียนรู้
- เข้าใจพื้นฐาน Next.js และ React
- สร้างระบบ Authentication
- ทำ CRUD Operations
- สร้าง Admin Dashboard ที่สวยงาม
- Deploy โปรเจกต์

### สิ่งที่ต้องเตรียม
- Node.js v18 ขึ้นไป
- Code Editor (VS Code แนะนำ)
- ความรู้พื้นฐาน JavaScript/TypeScript
- Terminal/Command Line

---

## 🎯 วันที่ 1: พื้นฐาน Next.js

### ช่วงเช้า (4 ชั่วโมง)

#### 1.1 ทำความรู้จักกับ Next.js (1 ชั่วโมง)

**Next.js คืออะไร?**
- Framework สำหรับ React ที่มีฟีเจอร์ครบครัน
- รองรับ Server-Side Rendering (SSR)
- ระบบ Routing ที่ใช้ง่าย
- Optimized สำหรับ Production

**ความแตกต่างระหว่าง Next.js กับ React แบบธรรมดา:**
- Next.js มี Routing system ในตัว
- รองรับ SSR และ Static Generation
- มี API Routes สำหรับทำ Backend
- Performance ดีกว่าเนื่องจาก Optimization ในตัว

#### 1.2 สร้างโปรเจกต์แรก (30 นาที)

```bash
# สร้างโปรเจกต์ใหม่
npx create-next-app@latest admin-panel --typescript --tailwind --app

# เข้าไปในโฟลเดอร์
cd admin-panel

# รันโปรเจกต์
npm run dev
```

เปิด Browser ที่ `http://localhost:3000` คุณจะเห็นหน้าแรกของ Next.js

#### 1.3 โครงสร้างโปรเจกต์ (30 นาที)

```
admin-panel/
├── app/                    # App Router (Next.js 13+)
│   ├── layout.tsx         # Layout หลัก
│   ├── page.tsx           # หน้าแรก
│   └── globals.css        # Global styles
├── public/                # Static files
├── components/            # React components (เราจะสร้าง)
├── lib/                   # Utility functions (เราจะสร้าง)
├── types/                 # TypeScript types (เราจะสร้าง)
└── package.json
```

**ไฟล์สำคัญ:**
- `app/layout.tsx`: Template หลักของแอพ
- `app/page.tsx`: หน้าแรก (/) 
- `app/globals.css`: CSS global
- `next.config.ts`: Configuration

#### 1.4 Routing ใน Next.js (1 ชั่วโมง)

Next.js ใช้ File-based Routing:

```
app/
├── page.tsx              → /
├── about/
│   └── page.tsx         → /about
├── dashboard/
│   ├── page.tsx         → /dashboard
│   └── users/
│       └── page.tsx     → /dashboard/users
└── products/
    └── [id]/
        └── page.tsx     → /products/:id (Dynamic Route)
```

**ตัวอย่าง Dynamic Route:**
```typescript
// app/products/[id]/page.tsx
export default function ProductPage({ params }: { params: { id: string } }) {
  return <div>Product ID: {params.id}</div>
}
```

#### 1.5 Components และ Props (1 ชั่วโมง)

**สร้าง Component แรก:**
```typescript
// components/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-medium transition';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
```

### ช่วงบ่าย (4 ชั่วโมง)

#### 1.6 Styling ด้วย Tailwind CSS (1 ชั่วโมง)

Tailwind CSS คือ Utility-first CSS Framework:

```typescript
// ตัวอย่างการใช้งาน
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-bold text-gray-800">Title</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Click me
  </button>
</div>
```

**Class ที่ใช้บ่อย:**
- `flex`, `grid`: Layout
- `p-4`, `m-4`: Padding, Margin
- `text-lg`, `font-bold`: Typography
- `bg-blue-600`, `text-white`: Colors
- `rounded`, `shadow`: Effects

#### 1.7 State Management (1.5 ชั่วโมง)

**useState Hook:**
```typescript
'use client' // Client Component

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

**useEffect Hook:**
```typescript
'use client'

import { useEffect, useState } from 'react'

export default function DataFetcher() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, []) // [] = run once

  if (loading) return <div>Loading...</div>
  return <div>{JSON.stringify(data)}</div>
}
```

#### 1.8 API Routes (1.5 ชั่วโมง)

Next.js ให้เราสร้าง API ได้ในตัว:

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

// GET /api/users
export async function GET() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]
  
  return NextResponse.json(users)
}

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json()
  
  // TODO: Save to database
  
  return NextResponse.json({ success: true, data: body })
}
```

**Dynamic API Route:**
```typescript
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id
  
  // TODO: Fetch from database
  const user = { id: userId, name: 'John Doe' }
  
  return NextResponse.json(user)
}
```

### 🏠 การบ้านวันที่ 1

1. สร้างหน้า About (`/about`)
2. สร้าง Component Card ที่รับ props (title, description)
3. สร้าง API Route `/api/products` ที่ return รายการสินค้า
4. ทำ Counter Component ที่มีปุ่ม +, - และ Reset

---

## 🚀 วันที่ 2: สร้าง Admin Panel

### ช่วงเช้า (4 ชั่วโมง)

#### 2.1 วางแผน Admin Panel (30 นาที)

**Features ที่จะทำ:**
- 📊 Dashboard (ภาพรวม)
- 👥 User Management (CRUD)
- 📦 Product Management (CRUD)
- 🔐 Authentication (Login/Logout)
- 📱 Responsive Design

**โครงสร้างหน้า:**
```
/admin
├── /dashboard          # Dashboard หลัก
├── /users              # จัดการ Users
│   ├── /new           # เพิ่ม User ใหม่
│   └── /[id]/edit     # แก้ไข User
├── /products          # จัดการ Products
│   ├── /new
│   └── /[id]/edit
└── /login             # หน้า Login
```

#### 2.2 สร้าง Layout สำหรับ Admin (1 ชั่วโมง)

**Sidebar Component:**
```typescript
// components/admin/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/products', label: 'Products', icon: '📦' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>
      <nav>
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded mb-2 transition ${
                isActive 
                  ? 'bg-blue-600' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
```

**Admin Layout:**
```typescript
// app/admin/layout.tsx
import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
```

#### 2.3 Dashboard หน้าหลัก (1 ชั่วโมง)

```typescript
// app/admin/dashboard/page.tsx
import StatsCard from '@/components/admin/StatsCard'

export default function DashboardPage() {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: '👥', change: '+12%' },
    { title: 'Total Products', value: '567', icon: '📦', change: '+8%' },
    { title: 'Total Orders', value: '891', icon: '🛒', change: '+23%' },
    { title: 'Revenue', value: '$12,345', icon: '💰', change: '+15%' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        {/* Activity list */}
      </div>
    </div>
  )
}
```

**StatsCard Component:**
```typescript
// components/admin/StatsCard.tsx
interface StatsCardProps {
  title: string
  value: string
  icon: string
  change: string
}

export default function StatsCard({ title, value, icon, change }: StatsCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <div className={`text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </div>
      </div>
      <div className="text-gray-600 text-sm mb-1">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
```

#### 2.4 Authentication System (1.5 ชั่วโมง)

**Login Page:**
```typescript
// app/admin/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.token)
        router.push('/admin/dashboard')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
```

**Login API:**
```typescript
// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // TODO: Validate with database
  // For demo purposes, we'll use simple validation
  if (email === 'admin@example.com' && password === 'password') {
    return NextResponse.json({
      success: true,
      token: 'demo-token-123',
      user: { email, name: 'Admin User' }
    })
  }

  return NextResponse.json(
    { success: false, message: 'Invalid credentials' },
    { status: 401 }
  )
}
```

### ช่วงบ่าย (4 ชั่วโมง)

#### 2.5 User Management - CRUD (2 ชั่วโมง)

**User List Page:**
```typescript
// app/admin/users/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return

    await fetch(`/api/users/${id}`, { method: 'DELETE' })
    setUsers(users.filter(u => u.id !== id))
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link
          href="/admin/users/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/users/${user.id}/edit`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

**User Form Component:**
```typescript
// components/admin/UserForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface UserFormProps {
  user?: {
    id?: number
    name: string
    email: string
    role: string
    status: string
  }
  isEdit?: boolean
}

export default function UserForm({ user, isEdit = false }: UserFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    status: user?.status || 'active'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = isEdit ? `/api/users/${user?.id}` : '/api/users'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      router.push('/admin/users')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
```

**Users API Routes:**
```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

// Mock data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'moderator', status: 'inactive' },
]

export async function GET() {
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newUser = {
    id: users.length + 1,
    ...body
  }
  users.push(newUser)
  return NextResponse.json(newUser, { status: 201 })
}
```

```typescript
// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server'

// Mock data (in real app, this would be from database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'moderator', status: 'inactive' },
]

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = users.find(u => u.id === parseInt(params.id))
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  return NextResponse.json(user)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const index = users.findIndex(u => u.id === parseInt(params.id))
  
  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  
  users[index] = { ...users[index], ...body }
  return NextResponse.json(users[index])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  users = users.filter(u => u.id !== parseInt(params.id))
  return NextResponse.json({ success: true })
}
```

#### 2.6 Product Management (1.5 ชั่วโมง)

**Product API:**
```typescript
// app/api/products/route.ts
import { NextResponse } from 'next/server'

let products = [
  { 
    id: 1, 
    name: 'Laptop Pro', 
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
    name: 'Desk Lamp', 
    price: 45.00, 
    category: 'Furniture',
    stock: 0,
    status: 'inactive'
  },
]

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newProduct = {
    id: products.length + 1,
    ...body
  }
  products.push(newProduct)
  return NextResponse.json(newProduct, { status: 201 })
}
```

**Products Page:**
```typescript
// app/admin/products/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  status: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return

    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    setProducts(products.filter(p => p.id !== id))
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <span className={`px-2 py-1 text-xs rounded ${
                product.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">${product.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span className={`font-medium ${
                  product.stock === 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {product.stock}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

#### 2.7 Responsive Design & Polish (30 นาที)

**Header Component with Mobile Menu:**
```typescript
// components/admin/Header.tsx
'use client'

import { useState } from 'react'

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰
          </button>
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-gray-600">Admin User</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
              A
            </div>
          </div>
          <button className="text-red-600 hover:text-red-700">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
```

### 🎓 สรุปและขั้นตอนต่อไป

#### สิ่งที่เราได้เรียนรู้

**วันที่ 1:**
- ✅ พื้นฐาน Next.js และ React
- ✅ Routing และ Dynamic Routes
- ✅ Components และ Props
- ✅ State Management (useState, useEffect)
- ✅ Styling ด้วย Tailwind CSS
- ✅ API Routes

**วันที่ 2:**
- ✅ Admin Layout และ Navigation
- ✅ Dashboard พร้อม Statistics
- ✅ Authentication System
- ✅ CRUD Operations (Users & Products)
- ✅ Responsive Design

#### ขั้นตอนต่อไป (ถ้าต้องการพัฒนาต่อ)

**การปรับปรุงที่แนะนำ:**

1. **Database Integration**
   - ใช้ Prisma + PostgreSQL/MySQL
   - Migration และ Schema management

2. **Advanced Authentication**
   - NextAuth.js สำหรับ OAuth
   - JWT tokens และ Session management
   - Protected Routes middleware

3. **File Upload**
   - Upload รูปภาพสินค้า
   - Image optimization

4. **Search & Filter**
   - Search bar สำหรับ Users และ Products
   - Advanced filters

5. **Pagination**
   - แบ่งหน้าข้อมูล
   - Load more functionality

6. **Form Validation**
   - React Hook Form + Zod
   - Client + Server validation

7. **Notifications**
   - Toast notifications
   - Success/Error messages

8. **Data Visualization**
   - Charts (Chart.js, Recharts)
   - Analytics dashboard

9. **Testing**
   - Jest + React Testing Library
   - E2E tests with Playwright

10. **Deployment**
    - Deploy บน Vercel
    - Environment variables
    - Production optimization

#### Resources เพิ่มเติม

**Documentation:**
- [Next.js Official Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

**Video Tutorials:**
- Next.js Official YouTube Channel
- Web Dev Simplified
- Traversy Media

**Communities:**
- Next.js Discord
- Reddit r/nextjs
- Stack Overflow

#### Tips สำหรับการเรียนรู้

1. **ฝึกทำบ่อยๆ** - Code ทุกวัน แม้แค่ 30 นาที
2. **อ่าน Documentation** - เป็นแหล่งข้อมูลที่ดีที่สุด
3. **ทำโปรเจกต์จริง** - เรียนรู้จากการทำ
4. **ถาม Community** - อย่ากลัวที่จะถาม
5. **Follow Best Practices** - เรียนรู้วิธีเขียนโค้ดที่ดี

---

## 🎉 ยินดีด้วย!

คุณได้เรียนรู้พื้นฐาน Next.js และสร้าง Admin Panel ที่สมบูรณ์แล้ว! 

จากจุดนี้ คุณสามารถ:
- พัฒนาต่อยอด features
- ใช้เป็นพื้นฐานสำหรับโปรเจกต์จริง
- เรียนรู้ advanced topics
- แชร์ความรู้กับคนอื่น

**Happy Coding! 🚀**
