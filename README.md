# Next.js Tutorial 2 Days - เรียนรู้ Next.js ใน 2 วัน

## 🎯 เกี่ยวกับคอร์สนี้

คอร์สเรียน Next.js แบบเข้มข้น ออกแบบมาให้เรียนจบภายใน 2 วัน สำหรับผู้ที่ต้องการเรียนรู้ Next.js ตั้งแต่เริ่มต้นจนสามารถสร้าง Admin Panel ที่สมบูรณ์ พร้อมโครงสร้างมืออาชีพ

### ✨ คุณจะได้เรียนรู้

- 📚 **พื้นฐาน Next.js** - Routing, Components, State Management
- 🎨 **Styling** - Tailwind CSS
- 🔐 **Authentication** - ระบบ Login/Logout
- 📊 **Admin Dashboard** - สร้าง Dashboard ที่สวยงาม
- 🛠️ **CRUD Operations** - จัดการ Users และ Products
- 📱 **Responsive Design** - รองรับทุกหน้าจอ
- 🚀 **API Service Pattern** - การเชื่อมต่อ API แบบมืออาชีพ
- 🏗️ **Professional Architecture** - โครงสร้างโค้ดที่เป็นมาตรฐาน

## 📖 คู่มือการเรียนรู้

### 📚 Tutorial แบบแบ่งวัน (แนะนำ)

เรียนรู้ทีละขั้นตอน แบ่งเป็น 2 วัน + หัวข้อขั้นสูง:

- **[📅 Day 1: Next.js Fundamentals](./tutorials/DAY1.md)** (8 ชั่วโมง)
  - พื้นฐาน Next.js, Components, Routing
  - Styling ด้วย Tailwind CSS
  - State Management & API Routes

- **[📅 Day 2: Admin Panel Development](./tutorials/DAY2.md)** (8 ชั่วโมง)
  - สร้าง Admin Layout & Dashboard
  - Authentication System
  - CRUD Operations (Users & Products)
  - Service Pattern สำหรับ API

- **[🚀 Advanced Topics](./tutorials/ADVANCED.md)**
  - Database Integration (Prisma)
  - Advanced Authentication (NextAuth.js)
  - State Management (Zustand, React Query)
  - Testing, Deployment และอื่นๆ

### 📖 เอกสารเพิ่มเติม

- **[🚀 Quick Start Guide](./QUICKSTART.md)** - เริ่มต้นใช้งานอย่างรวดเร็ว (5 นาที)
- **[📚 Full Tutorial](./TUTORIAL.md)** - คอร์สเรียนฉบับสมบูรณ์ (แบบเดิม)
- **[🏗️ Service Pattern Guide](./SERVICE_PATTERN.md)** - คู่มือ API Service Pattern แบบละเอียด
- **[☁️ Deployment Guide](./DEPLOYMENT.md)** - คู่มือการ Deploy

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนด

- Node.js v18 หรือสูงกว่า
- npm หรือ yarn
- Code Editor (แนะนำ VS Code)

### การติดตั้ง

```bash
# Clone repository
git clone https://github.com/somkheartk/nextjs-tutorial-2days.git
cd nextjs-tutorial-2days

# เข้าไปในโฟลเดอร์โปรเจกต์
cd admin-panel

# ติดตั้ง dependencies
npm install

# รันโปรเจกต์
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

## 🏗️ โครงสร้างมืออาชีพ

โปรเจกต์นี้ใช้โครงสร้างแบบมืออาชีพ พร้อม **Service Pattern** สำหรับการเชื่อมต่อ API:

```
admin-panel/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin Panel routes
│   └── api/               # API routes (proxy layer)
├── components/            # React components
│   └── admin/             # Admin-specific components
├── lib/
│   ├── api-service.ts     # 🎯 API Service Layer
│   ├── constants/         # Constants and configs
│   └── AdminContext.tsx   # Context providers
└── messages/              # i18n translations
```

### 🎯 API Service Pattern

โปรเจกต์นี้ใช้ **Service Pattern** สำหรับจัดการ API:

```typescript
// lib/api-service.ts - Centralized API management
export async function getUsers(): Promise<User[]> {
  // เชื่อมต่อกับ External API
  const response = await apiCall<User[]>(`${API_BASE_URL}/users`)
  return response
}

export async function createUser(userData: Partial<User>): Promise<User> {
  return await apiCall<User>(`${API_BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(userData)
  })
}
```

**ข้อดีของ Service Pattern:**
- ✅ แยก business logic ออกจาก UI
- ✅ ง่ายต่อการ maintain และ test
- ✅ Reusable across components
- ✅ Centralized error handling
- ✅ Type-safe with TypeScript

## 📅 แผนการเรียนรู้

### วันที่ 1: Next.js Fundamentals
- พื้นฐาน Next.js, Routing, Components
- Styling ด้วย Tailwind CSS
- State Management & API Routes

### วันที่ 2: Admin Panel Development
- Admin Layout, Dashboard, Authentication
- CRUD Operations with Service Pattern
- User & Product Management

### Advanced: ยกระดับสู่ Production
- Database Integration, Advanced Auth
- Testing, Performance, Deployment

👉 เริ่มเรียนเลย: **[Day 1 Tutorial](./tutorials/DAY1.md)**

## 🎨 Features

### Admin Panel ที่สมบูรณ์

- ✅ **Dashboard** - ภาพรวมสถิติและข้อมูล
- ✅ **User Management** - CRUD สำหรับจัดการผู้ใช้
- ✅ **Product Management** - CRUD สำหรับจัดการสินค้า
- ✅ **Authentication** - ระบบ Login/Logout
- ✅ **Responsive Design** - ใช้งานได้บน Mobile และ Desktop
- ✅ **Modern UI** - ออกแบบด้วย Tailwind CSS

### Demo Credentials

สำหรับทดสอบระบบ Login (ใช้กับ External API):
```
Username: emilys (หรือ email อะไรก็ได้)
Password: emilyspass (หรือ password อะไรก็ได้)
```

## 📂 โครงสร้างโปรเจกต์

```
admin-panel/
├── app/
│   ├── admin/              # Admin Panel
│   │   ├── dashboard/      # Dashboard หลัก
│   │   ├── users/          # User Management
│   │   ├── products/       # Product Management
│   │   ├── login/          # หน้า Login
│   │   └── layout.tsx      # Admin Layout
│   ├── api/                # API Routes (Proxy Layer)
│   │   ├── auth/           # Authentication APIs
│   │   ├── users/          # User APIs
│   │   └── products/       # Product APIs
│   ├── layout.tsx          # Root Layout
│   └── page.tsx            # หน้าแรก
├── components/             # React Components
│   └── admin/              # Admin Components
├── lib/                    # Core Libraries
│   ├── api-service.ts      # 🎯 API Service Layer (Main)
│   ├── AdminContext.tsx    # Admin Context
│   └── constants/          # Constants
├── messages/               # i18n Translations
│   ├── en.json
│   └── th.json
└── public/                 # Static Files
```

### 🎯 Key Architecture Features

1. **Service Layer Pattern** (`lib/api-service.ts`)
   - Centralized API management
   - Type-safe API calls
   - Error handling & retry logic
   - External API integration

2. **Component-based Architecture**
   - Reusable components
   - Clear separation of concerns
   - Admin-specific components

3. **Internationalization (i18n)**
   - Multi-language support (EN/TH)
   - Next-intl integration

4. **Professional Code Structure**
   - TypeScript for type safety
   - ESLint for code quality
   - Organized folder structure

## 🛠️ เทคโนโลジีที่ใช้

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API**: Next.js API Routes

## 📚 Resources เพิ่มเติม

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎯 ขั้นตอนต่อไป

หลังจากเรียนจบคอร์สแล้ว คุณสามารถ:

1. **ต่อยอดฟีเจอร์**: เพิ่ม Orders, Reports, Settings
2. **เชื่อมต่อ Database**: ใช้ Prisma + PostgreSQL/MySQL
3. **Authentication ขั้นสูง**: NextAuth.js, OAuth, JWT
4. **File Upload**: เพิ่มระบบอัปโหลดรูปภาพ
5. **Testing**: Jest, React Testing Library
6. **Deploy**: Vercel, Railway, VPS
7. **แชร์ความรู้**: สอนคนอื่นหรือเขียนบทความ

## 🤝 การมีส่วนร่วม

ยินดีรับ Pull Requests และ Issues! 

### การ Contribute

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📝 License

MIT License - ใช้งานได้อย่างอิสระ

## 👨‍💻 Author

Created with ❤️ for Thai developers learning Next.js

## 🌟 Support

ถ้าคอร์สนี้มีประโยชน์ อย่าลืม:
- ⭐ Star repository นี้
- 🐛 รายงาน bugs หรือ issues
- 💡 แนะนำฟีเจอร์ใหม่ๆ
- 📢 แชร์ให้เพื่อนๆ

---

**เริ่มเรียนรู้เลย! อ่าน [TUTORIAL.md](./TUTORIAL.md) และเริ่มต้นการเดินทางกับ Next.js**

**หรือเริ่มต้นทันที! อ่าน [QUICKSTART.md](./QUICKSTART.md) เพื่อติดตั้งและรันได้ภายใน 5 นาที**