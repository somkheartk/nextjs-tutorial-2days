# Advanced Topics: ยกระดับ Next.js Skills

> **เป้าหมาย:** เรียนรู้เทคนิคขั้นสูงเพื่อพัฒนาแอปพลิเคชัน Next.js ให้มีคุณภาพระดับ Production

## 📋 สารบัญ

- [1. Database Integration](#1-database-integration)
- [2. Advanced Authentication](#2-advanced-authentication)
- [3. API Service Pattern ขั้นสูง](#3-api-service-pattern-ขั้นสูง)
- [4. State Management ขั้นสูง](#4-state-management-ขั้นสูง)
- [5. Form Validation](#5-form-validation)
- [6. File Upload](#6-file-upload)
- [7. Search & Filter](#7-search--filter)
- [8. Pagination](#8-pagination)
- [9. Data Visualization](#9-data-visualization)
- [10. Performance Optimization](#10-performance-optimization)
- [11. Testing](#11-testing)
- [12. Deployment](#12-deployment)

---

## 1. Database Integration

### 💡 ทำไมต้องใช้ Database?

ปัจจุบันเราใช้ External API (JSONPlaceholder, DummyJSON) ซึ่ง:
- ❌ ข้อมูลไม่ถาวร (ไม่มีการบันทึกจริง)
- ❌ ไม่สามารถควบคุมข้อมูลได้เต็มที่
- ❌ จำกัดความสามารถในการ query

Database จะช่วยให้:
- ✅ เก็บข้อมูลถาวร
- ✅ Query และ filter ข้อมูลได้ซับซ้อน
- ✅ รองรับ Transactions และ Relations
- ✅ ควบคุมความปลอดภัยได้ดีกว่า

### Prisma + PostgreSQL

**Prisma** คือ ORM (Object-Relational Mapping) ที่ทำให้การจัดการ Database ง่ายขึ้น

#### ติดตั้ง Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

#### กำหนด Schema

**สร้างไฟล์ `prisma/schema.prisma`:**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// User Model
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  role      String   @default("user")
  status    String   @default("active")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Product Model
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Float
  category    String
  stock       Int
  status      String   @default("active")
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### Migration

```bash
# สร้าง migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

#### ใช้งาน Prisma

**สร้าง Prisma Client:**

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**อัพเดต API Service:**

```typescript
// lib/db-service.ts
import { prisma } from './prisma'

// Get all users
export async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

// Get user by ID
export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id }
  })
}

// Create user
export async function createUser(data: {
  name: string
  email: string
  role?: string
  status?: string
}) {
  return await prisma.user.create({
    data
  })
}

// Update user
export async function updateUser(id: number, data: Partial<User>) {
  return await prisma.user.update({
    where: { id },
    data
  })
}

// Delete user
export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: { id }
  })
}
```

**อัพเดต API Route:**

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'
import { getUsers, createUser } from '@/lib/db-service'

export async function GET() {
  try {
    const users = await getUsers()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const user = await createUser(body)
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
```

---

## 2. Advanced Authentication

### NextAuth.js

**NextAuth.js** คือ library ที่ทำให้การจัดการ Authentication ง่ายขึ้น

#### ติดตั้ง

```bash
npm install next-auth
```

#### การตั้งค่า

**สร้างไฟล์ `app/api/auth/[...nextauth]/route.ts`:**

```typescript
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    // Email/Password Login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.hashedPassword) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    }
  },

  pages: {
    signIn: '/admin/login',
  }
})

export { handler as GET, handler as POST }
```

#### ใช้งาน NextAuth

```typescript
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginPage() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => signIn('credentials')}>
        Sign in with Email
      </button>
      <button onClick={() => signIn('google')}>
        Sign in with Google
      </button>
    </div>
  )
}
```

### Protected Routes

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  },
})

export const config = {
  matcher: ['/admin/:path*']
}
```

---

## 3. API Service Pattern ขั้นสูง

### Error Handling & Retry Logic

```typescript
// lib/api-service-advanced.ts

interface ApiOptions extends RequestInit {
  retries?: number
  retryDelay?: number
}

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiCall<T>(
  url: string,
  options: ApiOptions = {}
): Promise<T> {
  const {
    retries = 3,
    retryDelay = 1000,
    ...fetchOptions
  } = options

  let lastError: Error | null = null

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new ApiError(
          error.message || `HTTP ${response.status}`,
          response.status,
          error
        )
      }

      return await response.json()
    } catch (error) {
      lastError = error as Error

      // Retry on network errors or 5xx errors
      if (
        i < retries - 1 &&
        (!(error instanceof ApiError) ||
          error.statusCode >= 500)
      ) {
        await new Promise(resolve =>
          setTimeout(resolve, retryDelay * (i + 1))
        )
        continue
      }

      throw error
    }
  }

  throw lastError
}
```

### Request Caching

```typescript
// lib/cache.ts

interface CacheEntry<T> {
  data: T
  timestamp: number
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl = this.defaultTTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) return null
    
    if (Date.now() > entry.timestamp) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data
  }

  clear(key?: string) {
    if (key) {
      this.cache.delete(key)
    } else {
      this.cache.clear()
    }
  }
}

export const apiCache = new ApiCache()

// Usage in service
export async function getUsers(): Promise<User[]> {
  const cacheKey = 'users:all'
  
  // Check cache first
  const cached = apiCache.get<User[]>(cacheKey)
  if (cached) return cached
  
  // Fetch from API
  const users = await apiCall<User[]>('/api/users')
  
  // Store in cache
  apiCache.set(cacheKey, users)
  
  return users
}
```

---

## 4. State Management ขั้นสูง

### Zustand (Global State Management)

```bash
npm install zustand
```

```typescript
// store/useStore.ts
import { create } from 'zustand'

interface User {
  id: number
  name: string
  email: string
}

interface AppState {
  user: User | null
  users: User[]
  setUser: (user: User | null) => void
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  removeUser: (id: number) => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  users: [],
  
  setUser: (user) => set({ user }),
  
  setUsers: (users) => set({ users }),
  
  addUser: (user) => set((state) => ({
    users: [...state.users, user]
  })),
  
  removeUser: (id) => set((state) => ({
    users: state.users.filter(u => u.id !== id)
  })),
}))

// Usage
function UserList() {
  const { users, removeUser } = useStore()
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => removeUser(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
```

### React Query (Server State Management)

```bash
npm install @tanstack/react-query
```

```typescript
// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// Usage
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, createUser } from '@/lib/api-service'

function UserList() {
  const queryClient = useQueryClient()
  
  // Fetch users
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
  
  // Create user mutation
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      
      <button onClick={() => createMutation.mutate({ 
        name: 'New User', 
        email: 'new@example.com' 
      })}>
        Add User
      </button>
    </div>
  )
}
```

---

## 5. Form Validation

### React Hook Form + Zod

```bash
npm install react-hook-form zod @hookform/resolvers
```

```typescript
// lib/validation.ts
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'),
  email: z.string().email('รูปแบบ email ไม่ถูกต้อง'),
  role: z.enum(['user', 'admin', 'moderator']),
  status: z.enum(['active', 'inactive']),
})

export type UserFormData = z.infer<typeof userSchema>

// Usage in form
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, type UserFormData } from '@/lib/validation'

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  })

  const onSubmit = async (data: UserFormData) => {
    try {
      await createUser(data)
      alert('สำเร็จ')
    } catch (error) {
      alert('เกิดข้อผิดพลาด')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name')} />
        {errors.name && (
          <p className="text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input {...register('email')} type="email" />
        {errors.email && (
          <p className="text-red-600">{errors.email.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'กำลังบันทึก...' : 'บันทึก'}
      </button>
    </form>
  )
}
```

---

## 6. File Upload

### Upload to Cloud Storage (Cloudinary)

```bash
npm install cloudinary
```

```typescript
// lib/upload.ts
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'products' },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(buffer)
  })
}

// API Route
import { NextResponse } from 'next/server'
import { uploadImage } from '@/lib/upload'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const result = await uploadImage(file)
    
    return NextResponse.json({ url: result.secure_url })
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}

// Component
'use client'

export default function ImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await res.json()
      setImageUrl(data.url)
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input 
        type="file" 
        onChange={handleUpload}
        disabled={uploading}
        accept="image/*"
      />
      
      {uploading && <p>Uploading...</p>}
      
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="w-48 h-48" />
      )}
    </div>
  )
}
```

---

## 7. Search & Filter

```typescript
'use client'

import { useState, useMemo } from 'react'

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Search filter
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Role filter
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchTerm, roleFilter, statusFilter])

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded"
        />

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Results */}
      <p className="mb-4">
        แสดง {filteredUsers.length} จาก {users.length} users
      </p>

      {/* User List */}
      {filteredUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

---

## 8. Pagination

```typescript
'use client'

import { useState, useEffect } from 'react'

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [perPage] = useState(10)

  useEffect(() => {
    loadUsers()
  }, [currentPage])

  async function loadUsers() {
    const res = await fetch(`/api/users?page=${currentPage}&per_page=${perPage}`)
    const data = await res.json()
    
    setUsers(data.users)
    setTotalPages(Math.ceil(data.total / perPage))
  }

  return (
    <div>
      {/* User List */}
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
```

---

## 9. Data Visualization

### Chart.js

```bash
npm install chart.js react-chartjs-2
```

```typescript
'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function SalesChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Sales',
      },
    },
  }

  return <Line options={options} data={data} />
}
```

---

## 10. Performance Optimization

### Code Splitting

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false
})

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart />
    </div>
  )
}
```

### Image Optimization

```typescript
import Image from 'next/image'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={300}
        priority={false}
        placeholder="blur"
        blurDataURL="/placeholder.jpg"
      />
    </div>
  )
}
```

---

## 11. Testing

### Jest + React Testing Library

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

```typescript
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/Button'

describe('Button', () => {
  it('renders button text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

## 12. Deployment

### Vercel (แนะนำ)

```bash
# ติดตั้ง Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

```bash
# .env.production
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key
```

---

## 📚 สรุป Advanced Topics

**ความสามารถที่ได้เรียนรู้:**
- ✅ Database Integration (Prisma)
- ✅ Advanced Authentication (NextAuth.js)
- ✅ Professional API Service Pattern
- ✅ State Management (Zustand, React Query)
- ✅ Form Validation (Zod)
- ✅ File Upload
- ✅ Search, Filter, Pagination
- ✅ Data Visualization
- ✅ Performance Optimization
- ✅ Testing
- ✅ Deployment

**ขั้นตอนต่อไป:**
- 🚀 ทำโปรเจกต์จริง
- 📖 อ่าน documentation เพิ่มเติม
- 👥 เข้าร่วม community
- 💡 แชร์ความรู้

---

**📖 กลับไปที่:** [Day 1](./DAY1.md) | [Day 2](./DAY2.md) | [Main README](../README.md)
