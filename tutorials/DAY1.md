# Day 1: Next.js Fundamentals (8 ชั่วโมง)

> **เป้าหมายวันที่ 1:** เรียนรู้พื้นฐาน Next.js, React Components, Routing, Styling และ API Routes

## 📋 สารบัญ

- [ช่วงเช้า (4 ชั่วโมง)](#ช่วงเช้า-4-ชั่วโมง)
  - [1.1 ทำความรู้จักกับ Next.js](#11-ทำความรู้จักกับ-nextjs-1-ชั่วโมง)
  - [1.2 สร้างโปรเจกต์แรก](#12-สร้างโปรเจกต์แรก-30-นาที)
  - [1.3 โครงสร้างโปรเจกต์](#13-โครงสร้างโปรเจกต์-30-นาที)
  - [1.4 Routing ใน Next.js](#14-routing-ใน-nextjs-1-ชั่วโมง)
  - [1.5 Components และ Props](#15-components-และ-props-1-ชั่วโมง)
- [ช่วงบ่าย (4 ชั่วโมง)](#ช่วงบ่าย-4-ชั่วโมง)
  - [1.6 Styling ด้วย Tailwind CSS](#16-styling-ด้วย-tailwind-css-1-ชั่วโมง)
  - [1.7 State Management](#17-state-management-15-ชั่วโมง)
  - [1.8 API Routes](#18-api-routes-15-ชั่วโมง)
- [การบ้านวันที่ 1](#การบ้านวันที่-1)

---

## ช่วงเช้า (4 ชั่วโมง)

### 1.1 ทำความรู้จักกับ Next.js (1 ชั่วโมง)

#### 💡 Next.js คืออะไร?

Next.js คือ React Framework ที่ถูกพัฒนาโดย Vercel ออกแบบมาเพื่อช่วยให้การพัฒนาเว็บแอปพลิเคชันด้วย React ทำได้ง่ายและมีประสิทธิภาพมากขึ้น

**คุณสมบัติหลัก:**
- 📱 **Server-Side Rendering (SSR)** - Render หน้าบน server ก่อนส่งให้ client
- 🎯 **Static Site Generation (SSG)** - สร้างหน้า HTML ล่วงหน้า
- 🚀 **File-based Routing** - สร้าง route อัตโนมัติจากโครงสร้างโฟลเดอร์
- ⚡ **API Routes** - สร้าง backend API ในโปรเจกต์เดียวกัน
- 🔄 **Hot Reloading** - เห็นการเปลี่ยนแปลงทันทีโดยไม่ต้อง refresh
- 📦 **Code Splitting** - แยก code เพื่อโหลดเฉพาะที่จำเป็น

#### 🤔 ทำไมต้องใช้ Next.js?

**ถ้า React เป็นเครื่องมือในการสร้างบ้าน, Next.js คือบ้านสำเร็จรูปที่มีทุกอย่างพร้อม:**

| React (CRA) | Next.js |
|-------------|---------|
| Client-Side Rendering | Server-Side + Client-Side |
| ต้องติดตั้ง Router เอง | Routing ในตัว (File-based) |
| ไม่มี Backend | มี API Routes ในตัว |
| SEO ยาก | SEO-friendly โดยธรรมชาติ |
| Setup เอง | มี Convention และ Best Practices |

**ข้อดีสำคัญ:**

1. **SEO ดีกว่า** - Search Engine สามารถ crawl และ index เว็บไซต์ได้ดีกว่า
2. **Performance สูง** - โหลดเร็ว, optimize รูปภาพอัตโนมัติ
3. **Developer Experience** - มี tooling และ convention ที่ดี
4. **Scalability** - รองรับโปรเจกต์ขนาดใหญ่
5. **Full-stack** - Frontend + Backend ในที่เดียว

#### 📚 คำศัพท์พื้นฐานที่ควรรู้

- **Component**: ชิ้นส่วนของ UI ที่สามารถนำกลับมาใช้ใหม่ได้
- **Props**: ข้อมูลที่ส่งผ่านระหว่าง Components
- **State**: ข้อมูลที่เปลี่ยนแปลงได้ในแอปพลิเคชัน
- **Route**: เส้นทาง URL ของแอปพลิเคชัน
- **API**: ช่องทางสำหรับสื่อสารระหว่าง Frontend และ Backend

---

### 1.2 สร้างโปรเจกต์แรก (30 นาที)

#### เตรียม Environment

**ข้อกำหนดระบบ:**
- Node.js v18 หรือสูงกว่า
- npm หรือ yarn
- Code Editor (แนะนำ VS Code)
- Terminal/Command Line

**ตรวจสอบ Node.js version:**
```bash
node --version  # ควรเป็น v18 ขึ้นไป
npm --version   # ควรเป็น 8 ขึ้นไป
```

#### สร้างโปรเจกต์ Next.js

```bash
# สร้างโปรเจกต์ใหม่
npx create-next-app@latest my-admin-panel

# ระหว่างการติดตั้งจะถามคำถาม ให้ตอบดังนี้:
# ✔ Would you like to use TypeScript? … Yes
# ✔ Would you like to use ESLint? … Yes
# ✔ Would you like to use Tailwind CSS? … Yes
# ✔ Would you like to use `src/` directory? … No
# ✔ Would you like to use App Router? … Yes
# ✔ Would you like to customize the default import alias? … No

# เข้าไปในโฟลเดอร์โปรเจกต์
cd my-admin-panel

# รันโปรเจกต์
npm run dev
```

#### เปิดดูผลลัพธ์

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000` คุณจะเห็น:
- หน้าแรกของ Next.js
- โลโก้ Next.js
- ลิงก์ไปยัง documentation

**🎉 ยินดีด้วย! คุณได้สร้างโปรเจกต์ Next.js แรกแล้ว**

---

### 1.3 โครงสร้างโปรเจกต์ (30 นาที)

#### โครงสร้างหลัก

```
my-admin-panel/
├── app/                    # App Router (Next.js 13+)
│   ├── layout.tsx         # Layout หลัก (ครอบทุกหน้า)
│   ├── page.tsx           # หน้าแรก (/)
│   └── globals.css        # Global styles
├── public/                # Static files (รูปภาพ, ไอคอน)
├── components/            # React components (จะสร้างเอง)
├── lib/                   # Utility functions และ services
├── types/                 # TypeScript types
├── node_modules/          # Dependencies (อย่าแก้ไข!)
├── .next/                 # Build output (อย่าแก้ไข!)
├── package.json           # ข้อมูลโปรเจกต์
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind config
└── next.config.ts         # Next.js config
```

#### ไฟล์สำคัญ

**1. `app/layout.tsx` - Root Layout**
```typescript
// Template หลักที่ครอบทุกหน้า
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**2. `app/page.tsx` - Home Page**
```typescript
// หน้าแรก (/)
export default function Home() {
  return <h1>Welcome to Next.js!</h1>
}
```

**3. `package.json` - Project Configuration**
```json
{
  "name": "my-admin-panel",
  "scripts": {
    "dev": "next dev",      // รัน development server
    "build": "next build",  // build สำหรับ production
    "start": "next start",  // รัน production server
    "lint": "next lint"     // ตรวจสอบ code quality
  }
}
```

---

### 1.4 Routing ใน Next.js (1 ชั่วโมง)

#### 💡 File-based Routing

Next.js ใช้ระบบ **File-based Routing** = โครงสร้างโฟลเดอร์คือ URL

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
        └── page.tsx     → /products/:id (Dynamic)
```

#### สร้าง Route ใหม่

**ตัวอย่าง: สร้างหน้า About**

1. สร้างโฟลเดอร์ `app/about/`
2. สร้างไฟล์ `app/about/page.tsx`:

```typescript
export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-600">
        เราคือทีมที่พัฒนา Admin Panel ด้วย Next.js
      </p>
    </div>
  )
}
```

3. เปิด `http://localhost:3000/about` จะเห็นหน้า About

#### Dynamic Routes (เส้นทางที่รับค่าแปรผัน)

**ใช้ `[parameter]` ในชื่อโฟลเดอร์:**

```typescript
// app/products/[id]/page.tsx
export default function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Product ID: {params.id}</h1>
    </div>
  )
}
```

**การใช้งาน:**
- `/products/1` → `params.id = "1"`
- `/products/abc` → `params.id = "abc"`
- `/products/123` → `params.id = "123"`

#### Navigation (การนำทาง)

**ใช้ Link component แทน `<a>` tag:**

```typescript
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="flex gap-4 p-4">
      <Link href="/" className="text-blue-600 hover:underline">
        Home
      </Link>
      <Link href="/about" className="text-blue-600 hover:underline">
        About
      </Link>
      <Link href="/products/1" className="text-blue-600 hover:underline">
        Product 1
      </Link>
    </nav>
  )
}
```

**ทำไมต้องใช้ `Link`?**
- ✅ Client-side navigation (ไม่ refresh หน้า)
- ✅ Prefetch อัตโนมัติ (โหลดเร็วขึ้น)
- ✅ Optimized performance

---

### 1.5 Components และ Props (1 ชั่วโมง)

#### 💡 Component คืออะไร?

Component คือชิ้นส่วนของ UI ที่นำกลับมาใช้ใหม่ได้ เหมือนตัวต่อเลโก้:

```
หน้าเว็บ = Header + Content + Footer
Content = Sidebar + MainContent
MainContent = Card + Card + Card
```

#### สร้าง Component แรก

**1. สร้างโฟลเดอร์ `components/`**

**2. สร้างไฟล์ `components/Button.tsx`**

```typescript
// components/Button.tsx

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-medium transition'
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  )
}
```

#### ใช้ Component

```typescript
// app/page.tsx
import Button from '@/components/Button'

export default function HomePage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Home Page</h1>
      
      <Button onClick={() => alert('Hello!')}>
        Click Me (Primary)
      </Button>
      
      <Button variant="secondary">
        Cancel (Secondary)
      </Button>
    </div>
  )
}
```

#### Props (Properties)

**Props คือข้อมูลที่ส่งให้ Component:**

```typescript
// Card Component ที่รับ props
interface CardProps {
  title: string
  description: string
  imageUrl?: string
}

export default function Card({ title, description, imageUrl }: CardProps) {
  return (
    <div className="border rounded-lg p-6 shadow">
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded" />}
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  )
}

// วิธีใช้
<Card 
  title="Product 1" 
  description="Amazing product" 
  imageUrl="/product1.jpg"
/>
```

---

## ช่วงบ่าย (4 ชั่วโมง)

### 1.6 Styling ด้วย Tailwind CSS (1 ชั่วโมง)

#### 💡 Tailwind CSS คืออะไร?

Tailwind CSS คือ **Utility-first CSS Framework** = ใช้ class สำเร็จรูปแทนการเขียน CSS เอง

**ข้อดี:**
- ⚡ เขียนได้เร็ว
- 🎯 เห็นผลทันที
- 📦 Bundle size เล็ก
- 🔄 Responsive ง่าย

#### Class พื้นฐาน

**1. Layout & Spacing:**
```typescript
// Flexbox
<div className="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

// Grid
<div className="grid grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Padding & Margin
<div className="p-4 m-2">     {/* padding: 16px, margin: 8px */}
<div className="px-4 py-2">   {/* padding-x: 16px, padding-y: 8px */}
```

**2. Typography:**
```typescript
<h1 className="text-3xl font-bold text-gray-800">
  Heading
</h1>

<p className="text-sm text-gray-600">
  Small text
</p>
```

**3. Colors:**
```typescript
<div className="bg-blue-600 text-white">     {/* Background + Text color */}
<div className="border border-gray-300">     {/* Border color */}
```

**4. Responsive Design:**
```typescript
<div className="text-sm md:text-lg lg:text-xl">
  {/* Mobile: small, Tablet: large, Desktop: x-large */}
</div>

// Breakpoints:
// sm: 640px   (มือถือใหญ่)
// md: 768px   (แท็บเล็ต)
// lg: 1024px  (เดสก์ทอป)
// xl: 1280px  (จอใหญ่)
```

#### ตัวอย่างจริง: Card Component

```typescript
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {product.name}
        </h2>
        <span className="text-sm text-gray-500">
          ${product.price}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">
        {product.description}
      </p>
      
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  )
}
```

---

### 1.7 State Management (1.5 ชั่วโมง)

#### 💡 State คืออะไร?

State คือข้อมูลที่เปลี่ยนแปลงได้ในแอปพลิเคชัน:
- ค่า Counter
- ข้อมูลฟอร์ม
- สถานะ Loading
- ข้อมูลจาก API

#### useState Hook

**Syntax:**
```typescript
const [state, setState] = useState(initialValue)
//     ↑        ↑              ↑
//   ค่า    ฟังก์ชันเปลี่ยน   ค่าเริ่มต้น
```

**ตัวอย่าง: Counter**

```typescript
'use client' // ⚠️ ต้องมี เพราะใช้ interactivity

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-8">
      <p className="text-4xl mb-4">Count: {count}</p>
      
      <div className="flex gap-2">
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + เพิ่ม
        </button>
        
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          - ลด
        </button>
        
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          ↻ Reset
        </button>
      </div>
    </div>
  )
}
```

**ตัวอย่าง: Form Input**

```typescript
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`ชื่อ: ${name}, Email: ${email}`)
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md">
      <div className="mb-4">
        <label className="block mb-2">ชื่อ:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        ส่งข้อมูล
      </button>
    </form>
  )
}
```

#### useEffect Hook

`useEffect` ใช้สำหรับทำงานพิเศษ เช่น:
- ดึงข้อมูลจาก API
- Subscribe/Unsubscribe
- เปลี่ยน Document Title

**Syntax:**
```typescript
useEffect(() => {
  // โค้ดที่ต้องการรัน
  
  return () => {
    // Cleanup (optional)
  }
}, [dependencies])  // รันเมื่อ dependencies เปลี่ยน
```

**ตัวอย่าง: Fetch Data**

```typescript
'use client'

import { useEffect, useState } from 'react'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, []) // [] = รันครั้งเดียวตอน mount

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

---

### 1.8 API Routes (1.5 ชั่วโมง)

#### 💡 API คืออะไร?

API (Application Programming Interface) คือช่องทางสื่อสารระหว่าง Frontend กับ Backend

```
Frontend ←→ API ←→ Backend/Database
```

#### HTTP Methods

| Method | ความหมาย | ใช้งาน |
|--------|---------|--------|
| GET | อ่าน/ดึงข้อมูล | ดูรายการ, ดูรายละเอียด |
| POST | สร้าง | เพิ่มข้อมูลใหม่ |
| PUT | แก้ไข (ทั้งหมด) | อัพเดตข้อมูล |
| PATCH | แก้ไข (บางส่วน) | อัพเดตบางฟิลด์ |
| DELETE | ลบ | ลบข้อมูล |

#### สร้าง API Route

**โครงสร้าง:**
```
app/
└── api/
    ├── users/
    │   └── route.ts           → /api/users
    └── products/
        └── route.ts           → /api/products
```

**ตัวอย่าง: GET Request**

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

// GET /api/users
export async function GET() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]
  
  return NextResponse.json(users)
}
```

**ตัวอย่าง: POST Request**

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  // Validation
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: 'ต้องระบุ name และ email' },
      { status: 400 }
    )
  }
  
  // สร้าง user ใหม่ (ในโปรเจกต์จริงจะบันทึกลง database)
  const newUser = {
    id: Date.now(),
    name: body.name,
    email: body.email,
  }
  
  return NextResponse.json(newUser, { status: 201 })
}
```

#### เรียกใช้ API จาก Frontend

```typescript
'use client'

async function createUser() {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'New User',
      email: 'new@example.com'
    })
  })
  
  const data = await response.json()
  console.log('User created:', data)
}
```

#### 🎯 Service Pattern (แนะนำ)

แทนที่จะเรียก API ตรงๆ ควรสร้าง Service Layer:

```typescript
// lib/api-service.ts

export async function getUsers() {
  const response = await fetch('/api/users')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export async function createUser(userData: { name: string; email: string }) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  if (!response.ok) {
    throw new Error('Failed to create user')
  }
  return response.json()
}
```

**วิธีใช้:**
```typescript
import { getUsers, createUser } from '@/lib/api-service'

// ใช้งานง่ายขึ้น
const users = await getUsers()
const newUser = await createUser({ name: 'John', email: 'john@example.com' })
```

---

## การบ้านวันที่ 1

1. ✏️ สร้างหน้า About (`/about`) พร้อม styling
2. ✏️ สร้าง Component `Card` ที่รับ props (title, description, imageUrl)
3. ✏️ สร้าง Counter Component ที่มีปุ่ม +, -, Reset
4. ✏️ สร้าง API Route `/api/products` ที่ return รายการสินค้า
5. ✏️ สร้างหน้าที่ดึงข้อมูลจาก API และแสดงผล

---

## 📚 สรุปวันที่ 1

**สิ่งที่เราได้เรียนรู้:**
- ✅ พื้นฐาน Next.js และข้อดี
- ✅ การสร้างโปรเจกต์และโครงสร้าง
- ✅ File-based Routing และ Dynamic Routes
- ✅ การสร้าง Components และใช้ Props
- ✅ Styling ด้วย Tailwind CSS
- ✅ State Management (useState, useEffect)
- ✅ การสร้าง API Routes
- ✅ Service Pattern สำหรับจัดการ API

**เตรียมพร้อมสำหรับวันที่ 2:**
- สร้าง Admin Panel
- Authentication System
- CRUD Operations
- Dashboard

---

**🎯 ไปต่อที่:** [Day 2 Tutorial](./DAY2.md)

**📖 กลับไปที่:** [Main README](../README.md)
