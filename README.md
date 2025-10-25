# Next.js Tutorial 2 Days - เรียนรู้ Next.js ใน 2 วัน

## 🎯 เกี่ยวกับคอร์สนี้

คอร์สเรียน Next.js แบบเข้มข้น ออกแบบมาให้เรียนจบภายใน 2 วัน สำหรับผู้ที่ต้องการเรียนรู้ Next.js ตั้งแต่เริ่มต้นจนสามารถสร้าง Admin Panel ที่สมบูรณ์

### ✨ คุณจะได้เรียนรู้

- 📚 **พื้นฐาน Next.js** - Routing, Components, State Management
- 🎨 **Styling** - Tailwind CSS
- 🔐 **Authentication** - ระบบ Login/Logout
- 📊 **Admin Dashboard** - สร้าง Dashboard ที่สวยงาม
- 🛠️ **CRUD Operations** - จัดการ Users และ Products
- 📱 **Responsive Design** - รองรับทุกหน้าจอ
- 🚀 **API Routes** - สร้าง Backend API

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

## 📖 เริ่มเรียนรู้

อ่านเอกสารคอร์สฉบับเต็มได้ที่: **[TUTORIAL.md](./TUTORIAL.md)**

### โครงสร้างคอร์ส

#### 📅 วันที่ 1 (8 ชั่วโมง)
- **ช่วงเช้า**: พื้นฐาน Next.js, Routing, Components
- **ช่วงบ่าย**: Styling, State Management, API Routes

#### 📅 วันที่ 2 (8 ชั่วโมง)
- **ช่วงเช้า**: Admin Layout, Dashboard, Authentication
- **ช่วงบ่าย**: User Management, Product Management, Polish

## 🎨 Features

### Admin Panel ที่สมบูรณ์

- ✅ **Dashboard** - ภาพรวมสถิติและข้อมูล
- ✅ **User Management** - CRUD สำหรับจัดการผู้ใช้
- ✅ **Product Management** - CRUD สำหรับจัดการสินค้า
- ✅ **Authentication** - ระบบ Login/Logout
- ✅ **Responsive Design** - ใช้งานได้บน Mobile และ Desktop
- ✅ **Modern UI** - ออกแบบด้วย Tailwind CSS

### Demo Credentials

สำหรับทดสอบระบบ Login:
```
Email: admin@example.com
Password: password
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
│   ├── api/                # API Routes
│   │   ├── auth/           # Authentication APIs
│   │   ├── users/          # User APIs
│   │   └── products/       # Product APIs
│   ├── layout.tsx          # Root Layout
│   └── page.tsx            # หน้าแรก
├── components/             # React Components
│   └── admin/              # Admin Components
├── lib/                    # Utility Functions
├── types/                  # TypeScript Types
└── public/                 # Static Files
```

## 🛠️ เทคโนโลยีที่ใช้

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

## 🤝 การมีส่วนร่วม

ยินดีรับ Pull Requests และ Issues! 

## 📝 License

MIT License - ใช้งานได้อย่างอิสระ

## 👨‍💻 Author

Created with ❤️ for Thai developers learning Next.js

---

**เริ่มเรียนรู้เลย! อ่าน [TUTORIAL.md](./TUTORIAL.md) และเริ่มต้นการเดินทางกับ Next.js**