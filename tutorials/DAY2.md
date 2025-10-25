# Day 2: สร้าง Admin Panel (8 ชั่วโมง)

> **เป้าหมายวันที่ 2:** สร้าง Admin Panel ที่สมบูรณ์พร้อม Authentication, CRUD Operations และ Dashboard

## 📋 สารบัญ

- [ช่วงเช้า (4 ชั่วโมง)](#ช่วงเช้า-4-ชั่วโมง)
  - [2.1 วางแผน Admin Panel](#21-วางแผน-admin-panel-30-นาที)
  - [2.2 สร้าง Layout สำหรับ Admin](#22-สร้าง-layout-สำหรับ-admin-1-ชั่วโมง)
  - [2.3 Dashboard หน้าหลัก](#23-dashboard-หน้าหลัก-1-ชั่วโมง)
  - [2.4 Authentication System](#24-authentication-system-15-ชั่วโมง)
- [ช่วงบ่าย (4 ชั่วโมง)](#ช่วงบ่าย-4-ชั่วโมง)
  - [2.5 User Management - CRUD](#25-user-management---crud-2-ชั่วโมง)
  - [2.6 Product Management](#26-product-management-15-ชั่วโมง)
  - [2.7 Polish & Responsive Design](#27-polish--responsive-design-30-นาที)

---

## ช่วงเช้า (4 ชั่วโมง)

### 2.1 วางแผน Admin Panel (30 นาที)

#### 💡 Admin Panel คืออะไร?

Admin Panel (Dashboard) คือส่วนหลังบ้านสำหรับจัดการข้อมูลและระบบ:
- เฉพาะ Admin/ผู้ดูแลระบบเข้าถึงได้
- จัดการข้อมูล (Users, Products, Orders)
- ดูสถิติและรายงาน
- ตั้งค่าระบบ

#### องค์ประกอบหลัก

1. **Sidebar Navigation** - เมนูหลักด้านซ้าย
2. **Header** - ส่วนบนแสดงชื่อผู้ใช้และปุ่ม Logout
3. **Dashboard** - หน้าภาพรวม (สถิติ, กราฟ)
4. **CRUD Pages** - หน้าจัดการข้อมูล
5. **Forms** - ฟอร์มเพิ่ม/แก้ไข
6. **Tables** - แสดงรายการข้อมูล

#### โครงสร้างที่จะสร้าง

```
app/
└── admin/
    ├── layout.tsx          # Admin layout (Sidebar + Header)
    ├── login/
    │   └── page.tsx        # หน้า Login
    ├── dashboard/
    │   └── page.tsx        # Dashboard หลัก
    ├── users/
    │   ├── page.tsx        # รายการ users
    │   ├── new/
    │   │   └── page.tsx    # เพิ่ม user
    │   └── [id]/
    │       └── edit/
    │           └── page.tsx # แก้ไข user
    └── products/
        ├── page.tsx        # รายการ products
        ├── new/
        │   └── page.tsx    # เพิ่ม product
        └── [id]/
            └── edit/
                └── page.tsx # แก้ไข product
```

---

### 2.2 สร้าง Layout สำหรับ Admin (1 ชั่วโมง)

#### Sidebar Component

**สร้างไฟล์ `components/admin/Sidebar.tsx`:**

```typescript
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
      {/* Logo */}
      <div className="text-2xl font-bold mb-8">
        Admin Panel
      </div>

      {/* Menu */}
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
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
```

#### Header Component

**สร้างไฟล์ `components/admin/Header.tsx`:**

```typescript
'use client'

import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handleLogout = () => {
    if (confirm('ต้องการออกจากระบบหรือไม่?')) {
      // ลบข้อมูล authentication
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // ไปหน้า login
      router.push('/admin/login')
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome, Admin
        </h1>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </header>
  )
}
```

#### Admin Layout

**สร้างไฟล์ `app/admin/layout.tsx`:**

```typescript
import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1">
        <Header />
        <main className="p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
```

---

### 2.3 Dashboard หน้าหลัก (1 ชั่วโมง)

#### Stats Card Component

**สร้างไฟล์ `components/admin/StatsCard.tsx`:**

```typescript
interface StatsCardProps {
  title: string
  value: string
  icon: string
  change: string
}

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  change 
}: StatsCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        <div className={`text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </div>
      </div>
      
      <div className="text-gray-600 text-sm mb-1">
        {title}
      </div>
      
      <div className="text-3xl font-bold text-gray-800">
        {value}
      </div>
    </div>
  )
}
```

#### Dashboard Page

**สร้างไฟล์ `app/admin/dashboard/page.tsx`:**

```typescript
import StatsCard from '@/components/admin/StatsCard'

export default function DashboardPage() {
  const stats = [
    { 
      title: 'Total Users', 
      value: '1,234', 
      icon: '👥', 
      change: '+12%' 
    },
    { 
      title: 'Total Products', 
      value: '567', 
      icon: '📦', 
      change: '+8%' 
    },
    { 
      title: 'Total Orders', 
      value: '891', 
      icon: '🛒', 
      change: '+23%' 
    },
    { 
      title: 'Revenue', 
      value: '$12,345', 
      icon: '💰', 
      change: '+15%' 
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Dashboard
      </h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Recent Activities
        </h2>
        
        <div className="space-y-4">
          <ActivityItem 
            user="John Doe" 
            action="created a new product"
            time="2 minutes ago"
          />
          <ActivityItem 
            user="Jane Smith" 
            action="updated user profile"
            time="15 minutes ago"
          />
          <ActivityItem 
            user="Bob Johnson" 
            action="deleted a product"
            time="1 hour ago"
          />
        </div>
      </div>
    </div>
  )
}

// Activity Item Component (inline)
function ActivityItem({ 
  user, 
  action, 
  time 
}: { 
  user: string
  action: string
  time: string 
}) {
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
        {user[0]}
      </div>
      <div className="flex-1">
        <p className="text-gray-800">
          <span className="font-medium">{user}</span> {action}
        </p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  )
}
```

---

### 2.4 Authentication System (1.5 ชั่วโมง)

#### Login Page

**สร้างไฟล์ `app/admin/login/page.tsx`:**

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // เรียก API login
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        // บันทึก token และข้อมูล user
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // ไปหน้า dashboard
        router.push('/admin/dashboard')
      } else {
        setError(data.message || 'Email หรือ Password ไม่ถูกต้อง')
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          🔐 Admin Login
        </h1>
        <p className="text-gray-600 text-center mb-6">
          เข้าสู่ระบบเพื่อจัดการข้อมูล
        </p>
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'กำลัง Login...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-700 mb-2">
            🔑 Demo Account:
          </p>
          <p className="text-sm text-gray-600">
            Email: <code className="bg-gray-200 px-2 py-1 rounded">emilys</code>
          </p>
          <p className="text-sm text-gray-600">
            Password: <code className="bg-gray-200 px-2 py-1 rounded">emilyspass</code>
          </p>
        </div>
      </div>
    </div>
  )
}
```

#### Login API with Service Pattern

**สร้างไฟล์ `app/api/auth/login/route.ts`:**

```typescript
import { NextResponse } from 'next/server'
import { login } from '@/lib/api-service'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // เรียกใช้ service
    const result = await login(email, password)

    if (result.success) {
      return NextResponse.json(result)
    }

    return NextResponse.json(
      { success: false, message: result.message },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาด' },
      { status: 500 }
    )
  }
}
```

**Service อยู่ใน `lib/api-service.ts` ที่เราสร้างไว้แล้ว:**

```typescript
// lib/api-service.ts

export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    // เชื่อมต่อกับ External API (DummyJSON)
    const response = await apiCall<DummyJSONAuthResponse>(`${AUTH_API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: 'emilys', 
        password: 'emilyspass',
        expiresInMins: 60,
      }),
    })
    
    if (response.token) {
      return {
        success: true,
        token: response.token,
        user: {
          email: response.email || email,
          name: `${response.firstName || ''} ${response.lastName || ''}`.trim(),
          role: 'admin',
        },
      }
    }
    
    return { success: false, message: 'Invalid credentials' }
  } catch (error) {
    return { success: false, message: 'Login failed' }
  }
}
```

---

## ช่วงบ่าย (4 ชั่วโมง)

### 2.5 User Management - CRUD (2 ชั่วโมง)

#### 💡 CRUD คืออะไร?

| ตัวอักษร | ความหมาย | HTTP Method |
|---------|---------|-------------|
| **C** | Create (สร้าง) | POST |
| **R** | Read (อ่าน) | GET |
| **U** | Update (แก้ไข) | PUT/PATCH |
| **D** | Delete (ลบ) | DELETE |

#### User List Page

**สร้างไฟล์ `app/admin/users/page.tsx`:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getUsers, deleteUser, type User } from '@/lib/api-service'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('ต้องการลบ user นี้หรือไม่?')) return

    try {
      await deleteUser(id)
      setUsers(users.filter(u => u.id !== id))
      alert('ลบสำเร็จ')
    } catch (error) {
      alert('เกิดข้อผิดพลาด')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          User Management
        </h1>
        <Link
          href="/admin/users/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          ➕ Add User
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/admin/users/${user.id}/edit`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    🗑️ Delete
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

#### User Form Component

**สร้างไฟล์ `components/admin/UserForm.tsx`:**

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUser, updateUser, type User } from '@/lib/api-service'

interface UserFormProps {
  user?: User
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
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEdit && user) {
        await updateUser(user.id, formData)
        alert('อัพเดตสำเร็จ')
      } else {
        await createUser(formData)
        alert('เพิ่มสำเร็จ')
      }
      router.push('/admin/users')
    } catch (error) {
      alert('เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? 'แก้ไข User' : 'เพิ่ม User ใหม่'}
      </h2>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          ชื่อ-นามสกุล
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Role Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Role
        </label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
      </div>

      {/* Status Field */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
        >
          {loading ? 'กำลังบันทึก...' : isEdit ? 'อัพเดต' : 'สร้าง'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          ยกเลิก
        </button>
      </div>
    </form>
  )
}
```

#### Create & Edit Pages

**สร้างไฟล์ `app/admin/users/new/page.tsx`:**

```typescript
import UserForm from '@/components/admin/UserForm'

export default function NewUserPage() {
  return (
    <div>
      <UserForm />
    </div>
  )
}
```

**สร้างไฟล์ `app/admin/users/[id]/edit/page.tsx`:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getUserById, type User } from '@/lib/api-service'
import UserForm from '@/components/admin/UserForm'

export default function EditUserPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    try {
      const data = await getUserById(parseInt(params.id))
      setUser(data)
    } catch (error) {
      console.error('Error loading user:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!user) {
    return <div className="text-center py-8">User not found</div>
  }

  return (
    <div>
      <UserForm user={user} isEdit={true} />
    </div>
  )
}
```

---

### 2.6 Product Management (1.5 ชั่วโมง)

#### Product List Page

**สร้างไฟล์ `app/admin/products/page.tsx`:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProducts, deleteProduct, type Product } from '@/lib/api-service'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('ต้องการลบสินค้านี้หรือไม่?')) return

    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
      alert('ลบสำเร็จ')
    } catch (error) {
      alert('เกิดข้อผิดพลาด')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Product Management
        </h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          ➕ Add Product
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex-1">
                {product.name}
              </h3>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                product.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.status}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ราคา:</span>
                <span className="font-bold text-blue-600">${product.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">หมวดหมู่:</span>
                <span className="font-medium text-gray-800">{product.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">คลัง:</span>
                <span className={`font-medium ${
                  product.stock === 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {product.stock}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm font-medium"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Product Form และหน้าอื่นๆ ทำคล้ายกับ User Management**

---

### 2.7 Polish & Responsive Design (30 นาที)

#### Responsive Sidebar

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`
        w-64 bg-gray-800 text-white min-h-screen p-4
        fixed lg:static inset-y-0 left-0 z-40
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* ... rest of sidebar code ... */}
      </aside>

      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </>
  )
}
```

---

## 📚 สรุปวันที่ 2

**สิ่งที่เราได้เรียนรู้:**
- ✅ การวางแผนและออกแบบ Admin Panel
- ✅ สร้าง Layout (Sidebar + Header)
- ✅ Dashboard พร้อม Statistics
- ✅ Authentication System (Login/Logout)
- ✅ CRUD Operations (Users & Products)
- ✅ Service Pattern สำหรับจัดการ API
- ✅ Responsive Design

**ความสามารถที่ได้:**
- สร้าง Admin Panel ที่สมบูรณ์
- จัดการข้อมูล Users และ Products
- ใช้ Service Pattern อย่างมืออาชีพ
- เชื่อมต่อกับ External API

---

**🚀 ไปต่อที่:** [Advanced Topics](./ADVANCED.md)

**📖 ดูเนื้อหาเพิ่มเติม:** [Full Tutorial](../TUTORIAL.md)

**📖 กลับไปที่:** [Day 1](./DAY1.md) | [Main README](../README.md)
