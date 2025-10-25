# Quick Start Guide - เริ่มต้นใช้งานอย่างรวดเร็ว

## การติดตั้งและรัน

### ขั้นตอนที่ 1: Clone Repository

```bash
git clone https://github.com/somkheartk/nextjs-tutorial-2days.git
cd nextjs-tutorial-2days
```

### ขั้นตอนที่ 2: เข้าไปในโฟลเดอร์โปรเจกต์

```bash
cd admin-panel
```

### ขั้นตอนที่ 3: ติดตั้ง Dependencies

```bash
npm install
```

### ขั้นตอนที่ 4: ตั้งค่า Environment Variables

```bash
# คัดลอกไฟล์ตัวอย่าง
cp .env.example .env.local
```

ไฟล์ `.env.local` จะมีการตั้งค่า External APIs:
- JSONPlaceholder สำหรับข้อมูล Users
- DummyJSON สำหรับข้อมูล Products และ Authentication

### ขั้นตอนที่ 5: รันโปรเจกต์

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

## การใช้งาน Admin Panel

1. คลิกที่ปุ่ม "🚀 ไปที่ Admin Panel" หรือไปที่ `/admin/login`
2. Login ด้วย (ใช้ External API):
   - **Username**: `emilys` (หรือ email อะไรก็ได้)
   - **Password**: `emilyspass` (หรือ password อะไรก็ได้)
3. สำรวจฟีเจอร์ต่างๆ:
   - Dashboard: ดูภาพรวมสถิติ
   - Users: จัดการผู้ใช้ (เพิ่ม/แก้ไข/ลบ) - ข้อมูลจาก JSONPlaceholder
   - Products: จัดการสินค้า (เพิ่ม/แก้ไข/ลบ) - ข้อมูลจาก DummyJSON

## 🌐 External API Integration

แอปพลิเคชันนี้ใช้ **External APIs** แทน Next.js internal API routes:
- **JSONPlaceholder** (https://jsonplaceholder.typicode.com) - สำหรับ Users
- **DummyJSON** (https://dummyjson.com) - สำหรับ Products และ Authentication

อ่านเพิ่มเติมได้ที่: [admin-panel/EXTERNAL_API.md](./admin-panel/EXTERNAL_API.md)

## คำสั่งที่สำคัญ

```bash
# รันในโหมด Development
npm run dev

# Build สำหรับ Production
npm run build

# รัน Production build
npm start

# Lint โค้ด
npm run lint
```

## โครงสร้างโปรเจกต์

```
admin-panel/
├── app/                        # Next.js App Router
│   ├── admin/                  # Admin Panel Routes
│   │   ├── dashboard/          # Dashboard Page
│   │   ├── users/              # User Management
│   │   ├── products/           # Product Management
│   │   ├── login/              # Login Page
│   │   └── layout.tsx          # Admin Layout
│   ├── api/                    # API Routes
│   │   ├── auth/login/         # Login API
│   │   ├── users/              # Users API
│   │   └── products/           # Products API
│   ├── globals.css             # Global Styles
│   ├── layout.tsx              # Root Layout
│   └── page.tsx                # Landing Page
├── components/                 # React Components
│   └── admin/                  # Admin Components
│       ├── Header.tsx          # Header Component
│       ├── Sidebar.tsx         # Sidebar Navigation
│       ├── StatsCard.tsx       # Statistics Card
│       ├── UserForm.tsx        # User Form
│       └── ProductForm.tsx     # Product Form
├── public/                     # Static Files
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript Config
```

## Features Overview

### 🔐 Authentication
- หน้า Login ที่สวยงาม
- Demo authentication (สามารถแทนที่ด้วย JWT/OAuth ได้)
- Protected routes

### 📊 Dashboard
- Statistics cards แสดงข้อมูลสรุป
- Recent activities
- Responsive design

### 👥 User Management
- แสดงรายการ users ในรูปแบบ table
- Create new user
- Edit existing user
- Delete user
- Status และ role management

### 📦 Product Management
- แสดงรายการ products ในรูปแบบ cards
- Create new product
- Edit existing product
- Delete product
- Category และ stock management

### 🎨 UI/UX
- Responsive design (Mobile, Tablet, Desktop)
- Tailwind CSS สำหรับ styling
- Clean และ modern interface
- Smooth transitions

## การปรับแต่ง

### เปลี่ยนสี Theme

แก้ไขใน `tailwind.config.ts` หรือใช้ Tailwind classes:

```tsx
// Primary color: blue-600
// Secondary color: gray-800
// Success: green-600
// Danger: red-600
```

### เพิ่ม Menu Item ใหม่

แก้ไขใน `components/admin/Sidebar.tsx`:

```typescript
const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/products', label: 'Products', icon: '📦' },
  // เพิ่มใหม่ที่นี่
  { href: '/admin/orders', label: 'Orders', icon: '🛒' },
]
```

### เชื่อมต่อ Database

ในโปรเจกต์นี้ใช้ Mock data ใน memory สำหรับ demo. เพื่อเชื่อมต่อ database จริง:

1. ติดตั้ง Prisma:
```bash
npm install prisma @prisma/client
npx prisma init
```

2. แก้ไข API routes ใน `app/api/*/route.ts` ให้ใช้ Prisma แทน mock data

3. สร้าง schema และ migrate:
```bash
npx prisma migrate dev
```

## Tips & Tricks

### Hot Reload ไม่ทำงาน?
```bash
# ลองลบ .next folder และ restart
rm -rf .next
npm run dev
```

### Port 3000 ถูกใช้แล้ว?
```bash
# ใช้ port อื่น
PORT=3001 npm run dev
```

### Build Error?
```bash
# ลบ dependencies และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install
```

## ขั้นตอนต่อไป

1. อ่าน **[TUTORIAL.md](../TUTORIAL.md)** เพื่อเรียนรู้แบบละเอียด
2. ปรับแต่ง UI ให้ตรงกับความต้องการ
3. เชื่อมต่อ database จริง
4. เพิ่ม authentication จริงด้วย NextAuth.js
5. Deploy บน Vercel หรือ platform อื่นๆ

## ต้องการความช่วยเหลือ?

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 💬 [Next.js Discord](https://discord.gg/nextjs)
- 🐛 [Report Issues](https://github.com/somkheartk/nextjs-tutorial-2days/issues)

---

**Happy Coding! 🚀**
