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

### 💡 คำศัพท์พื้นฐานที่ควรรู้

ก่อนเริ่มเรียน มาทำความรู้จักกับคำศัพท์สำคัญกันก่อน:

- **Framework**: กรอบการทำงานที่มีโครงสร้างและเครื่องมือพร้อมใช้ ช่วยให้เราสร้างแอปได้เร็วขึ้น
- **Component**: ชิ้นส่วนของ UI ที่สามารถนำกลับมาใช้ใหม่ได้ (เหมือนตัวต่อเลโก้)
- **State**: ข้อมูลที่เปลี่ยนแปลงได้ในแอปพลิเคชัน (เช่น ข้อมูลฟอร์ม, สถานะ Login)
- **Props**: ข้อมูลที่ส่งผ่านจาก Component หนึ่งไปยังอีก Component หนึ่ง
- **API**: ช่องทางสำหรับให้ Frontend สื่อสารกับ Backend เพื่อดึงหรือส่งข้อมูล
- **Route**: เส้นทาง URL ของแอปพลิเคชัน (เช่น `/home`, `/about`, `/products`)
- **Rendering**: การแสดงผล HTML จากข้อมูลและ Component

---

## 🎯 วันที่ 1: พื้นฐาน Next.js

### ช่วงเช้า (4 ชั่วโมง)

#### 1.1 ทำความรู้จักกับ Next.js (1 ชั่วโมง)

**Next.js คืออะไร?**
- Framework สำหรับ React ที่มีฟีเจอร์ครบครัน
- รองรับ Server-Side Rendering (SSR)
- ระบบ Routing ที่ใช้ง่าย
- Optimized สำหรับ Production

**🤔 พื้นฐาน: React คืออะไร?**

ก่อนเรียน Next.js เราควรเข้าใจ React ก่อน:
- **React** เป็น Library สำหรับสร้าง User Interface (UI)
- ใช้แนวคิด **Component-Based** (แบ่งหน้าเว็บเป็นชิ้นส่วนเล็กๆ)
- เขียนด้วย **JavaScript/TypeScript**
- ทำให้การอัพเดต UI เร็วและมีประสิทธิภาพ

**💡 ทำไมต้องใช้ Next.js?**

ถ้า React เป็นเครื่องมือในการสร้างบ้าน, Next.js คือบ้านสำเร็จรูปที่มีทุกอย่างพร้อม:

1. **Routing อัตโนมัติ**: ไม่ต้องติดตั้ง React Router แยก เพียงสร้างไฟล์ = สร้าง Route
2. **SEO ดีกว่า**: Server-Side Rendering ทำให้ Search Engine อ่านเว็บได้ง่าย
3. **Performance**: Auto-optimize รูปภาพ, Code splitting, และอื่นๆ
4. **Full-stack**: สร้าง API ได้ในโปรเจกต์เดียวกัน ไม่ต้องแยก Backend

**ความแตกต่างระหว่าง Next.js กับ React แบบธรรมดา:**

| React (CRA) | Next.js |
|-------------|---------|
| Client-Side Rendering | Server-Side + Client-Side |
| ต้องติดตั้ง Router เอง | Routing ในตัว (File-based) |
| ไม่มี Backend | มี API Routes ในตัว |
| SEO ยาก | SEO-friendly โดยธรรมชาติ |
| Setup เอง | มี Convention และ Best Practices |

**⚠️ ข้อควรระวัง:**
- Next.js มีการเรียนรู้ที่สูงกว่า React เล็กน้อย (แต่คุ้มค่า!)
- ต้องเข้าใจเรื่อง Client Component vs Server Component (Next.js 13+)
- File structure สำคัญมาก เพราะมันคือ Route ของเรา

#### 1.2 สร้างโปรเจกต์แรก (30 นาที)

**💡 พื้นฐาน: Command Line คืออะไร?**

Terminal หรือ Command Line คือโปรแกรมที่ให้เราสั่งงานคอมพิวเตอร์ด้วยคำสั่งข้อความ:
- บน Mac/Linux ใช้ **Terminal**
- บน Windows ใช้ **Command Prompt** หรือ **PowerShell**
- แนะนำให้ใช้ **Git Bash** บน Windows (มากับ Git)

**คำสั่งพื้นฐานที่ควรรู้:**
```bash
cd foldername    # เข้าไปในโฟลเดอร์ (change directory)
cd ..            # กลับไปโฟลเดอร์ก่อนหน้า
ls               # ดูไฟล์ในโฟลเดอร์ปัจจุบัน (Mac/Linux)
dir              # ดูไฟล์ในโฟลเดอร์ปัจจุบัน (Windows)
pwd              # ดูว่าเราอยู่โฟลเดอร์ไหน
```

**เริ่มสร้างโปรเจกต์:**

```bash
# สร้างโปรเจกต์ใหม่
npx create-next-app@latest admin-panel --typescript --tailwind --app

# เข้าไปในโฟลเดอร์
cd admin-panel

# รันโปรเจกต์
npm run dev
```

**🔍 อธิบายคำสั่ง:**
- `npx`: รันแพ็คเกจ npm โดยไม่ต้องติดตั้งถาวร
- `create-next-app`: เครื่องมือสร้างโปรเจกต์ Next.js
- `@latest`: ใช้เวอร์ชันล่าสุด
- `--typescript`: ใช้ TypeScript (ภาษาที่มี Type safety)
- `--tailwind`: ติดตั้ง Tailwind CSS (CSS Framework)
- `--app`: ใช้ App Router (รูปแบบใหม่ของ Next.js 13+)

**💡 Tips:**
- ถ้า `npm run dev` ช้า ให้ลองปิดโปรแกรมอื่นๆ
- Port default คือ 3000 ถ้าถูกใช้แล้วจะขึ้นเป็น 3001 อัตโนมัติ
- กด `Ctrl + C` เพื่อหยุดการรัน dev server

เปิด Browser ที่ `http://localhost:3000` คุณจะเห็นหน้าแรกของ Next.js

**🎯 สิ่งที่ควรเห็น:**
- หน้าเว็บสีดำพร้อมโลโก้ Next.js
- ปุ่ม "Deploy now" และ "Read our docs"
- ถ้าเห็นแบบนี้แสดงว่าสำเร็จแล้ว!

#### 1.3 โครงสร้างโปรเจกต์ (30 นาที)

**💡 พื้นฐาน: โครงสร้างโฟลเดอร์และไฟล์**

โปรเจกต์ Next.js มีโครงสร้างที่ชัดเจน แต่ละโฟลเดอร์มีหน้าที่เฉพาะ:

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
├── node_modules/          # แพ็คเกจที่ติดตั้ง (อย่าแก้ไข!)
├── .next/                 # Build output (อย่าแก้ไข!)
├── package.json           # ข้อมูลโปรเจกต์และ dependencies
├── tsconfig.json          # การตั้งค่า TypeScript
├── tailwind.config.ts     # การตั้งค่า Tailwind CSS
└── next.config.ts         # การตั้งค่า Next.js
```

**📁 อธิบายแต่ละโฟลเดอร์:**

**1. โฟลเดอร์ `app/`** (สำคัญที่สุด!)
- เป็นหัวใจหลักของ Next.js App Router
- ทุกไฟล์ที่ชื่อ `page.tsx` จะกลายเป็น Route
- `layout.tsx` คือ Template ที่ครอบทุกหน้า
- เราจะใช้โฟลเดอร์นี้บ่อยที่สุด

**2. โฟลเดอร์ `public/`**
- เก็บไฟล์ที่ไม่ต้อง compile (รูปภาพ, ฟอนต์, favicon)
- เข้าถึงได้ตรงๆ เช่น `/logo.png` → `public/logo.png`

**3. โฟลเดอร์ `components/`** (เราจะสร้างเอง)
- เก็บ React Components ที่ใช้ซ้ำได้
- เช่น Button, Card, Modal

**4. โฟลเดอร์ `node_modules/`**
- เก็บโค้ดของแพ็คเกจที่เราติดตั้ง
- ⚠️ อย่าแก้ไขโฟลเดอร์นี้!
- ถูกสร้างโดย `npm install`

**5. โฟลเดอร์ `.next/`**
- โค้ดที่ Next.js compile แล้ว
- ⚠️ อย่าแก้ไขโฟลเดอร์นี้!
- ถ้ามีปัญหา ลบแล้ว restart ได้

**ไฟล์สำคัญ:**

**1. `app/layout.tsx`**: Template หลักของแอพ
```typescript
// ทุกหน้าจะถูกครอบด้วย layout นี้
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>  {/* หน้าต่างๆ จะแสดงที่นี่ */}
    </html>
  )
}
```

**2. `app/page.tsx`**: หน้าแรก (/)
- ไฟล์นี้แสดงเมื่อเปิด `http://localhost:3000`

**3. `package.json`**: ข้อมูลโปรเจกต์
- ชื่อโปรเจกต์, เวอร์ชัน
- Dependencies (แพ็คเกจที่ใช้)
- Scripts (คำสั่งต่างๆ)

**4. `next.config.ts`**: การตั้งค่า Next.js
- กำหนดพฤติกรรมของ Next.js
- สำหรับขั้นสูง (ตอนนี้ยังไม่ต้องแก้)

**💡 Tips:**
- ใช้ VS Code extension "ES7+ React/Redux/React-Native snippets" จะพิมพ์โค้ดได้เร็วขึ้น
- กด `Cmd/Ctrl + P` ใน VS Code เพื่อค้นหาไฟล์รวดเร็ว
- ตั้งชื่อไฟล์และโฟลเดอร์เป็นภาษาอังกฤษเสมอ

#### 1.4 Routing ใน Next.js (1 ชั่วโมง)

**💡 พื้นฐาน: Routing คืออะไร?**

Routing คือการกำหนดว่า URL ไหนจะแสดงหน้าไหน:
- `/` → หน้าแรก
- `/about` → หน้า About
- `/products` → หน้าสินค้า
- `/products/123` → หน้ารายละเอียดสินค้า ID 123

**ใน Next.js มี 2 แบบ:**
1. **App Router** (Next.js 13+) - ใหม่กว่า, ใช้โฟลเดอร์ `app/`
2. **Pages Router** (เดิม) - ใช้โฟลเดอร์ `pages/`

เราจะใช้ **App Router** เพราะเป็นมาตรฐานใหม่และมีความสามารถมากกว่า

**🗂️ File-based Routing**

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
        └── page.tsx     → /products/:id (Dynamic Route)
```

**📝 กฎสำคัญ:**
- ไฟล์ชื่อ `page.tsx` เท่านั้นที่เป็น Route
- ไฟล์อื่นๆ ในโฟลเดอร์ `app/` จะไม่เป็น Route (เช่น `layout.tsx`, `loading.tsx`)
- โฟลเดอร์ที่ไม่มี `page.tsx` จะไม่สามารถเข้าถึงได้

**ตัวอย่าง: สร้าง Route `/about`**

1. สร้างโฟลเดอร์ `app/about/`
2. สร้างไฟล์ `app/about/page.tsx`:

```typescript
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>เกี่ยวกับเรา</p>
    </div>
  )
}
```

3. เปิด `http://localhost:3000/about` จะเห็นหน้า About

**🔗 Dynamic Route (Route ที่รับค่าแปรผัน)**

บางครั้งเราต้องการ Route ที่ URL เปลี่ยนได้ เช่น:
- `/products/1` → สินค้า ID 1
- `/products/2` → สินค้า ID 2
- `/users/john` → ผู้ใช้ชื่อ john

ใช้ **[ชื่อตัวแปร]** ในชื่อโฟลเดอร์:

**ตัวอย่าง Dynamic Route:**
```typescript
// app/products/[id]/page.tsx
export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Product ID: {params.id}</h1>
    </div>
  )
}
```

**🔍 อธิบาย:**
- `[id]` = Dynamic segment (รับค่าอะไรก็ได้)
- `params.id` = ค่าที่อยู่ใน URL
- `/products/123` → `params.id = "123"`
- `/products/abc` → `params.id = "abc"`

**💡 Tips:**
- ใช้ชื่อโฟลเดอร์เป็นพหูพจน์ (products, users) ถ้ามีหลายรายการ
- ใช้ชื่อเป็นเอกพจน์ (product, user) ถ้าเป็นรายละเอียด
- Route ทั้งหมดใน Next.js เป็น Server Component โดย default (เร็วกว่า)

**⚠️ ข้อควรระวัง:**
- ชื่อโฟลเดอร์ต้องเป็นตัวพิมพ์เล็กทั้งหมด (lowercase)
- ใช้ `-` หรือ `_` แทนช่องว่าง เช่น `user-profile` ไม่ใช่ `user profile`
- ไฟล์ `page.tsx` เท่านั้นที่เป็น Route (ไม่ใช่ `Page.tsx` หรือ `index.tsx`)

#### 1.5 Components และ Props (1 ชั่วโมง)

**💡 พื้นฐาน: Component คืออะไร?**

Component คือชิ้นส่วนของ UI ที่สามารถนำกลับมาใช้ใหม่ได้ เหมือนตัวต่อเลโก้:
- ปุ่ม (Button) = Component
- การ์ด (Card) = Component  
- ฟอร์ม (Form) = Component

**ทำไมต้องใช้ Component?**
1. **นำกลับมาใช้ใหม่ได้** (Reusable) - เขียนครั้งเดียว ใช้ได้หลายที่
2. **แยกส่วนชัดเจน** - แต่ละส่วนดูแลตัวเอง ไม่ยุ่งกัน
3. **แก้ไขง่าย** - แก้ Component เดียว ทุกที่ที่ใช้ก็เปลี่ยนตาม
4. **ทำงานร่วมกันได้** - คนละคนทำคนละ Component ได้

**📦 Props คืออะไร?**

Props (Properties) คือข้อมูลที่ส่งให้ Component เหมือนส่งพารามิเตอร์ให้ฟังก์ชัน:

```typescript
// ส่ง props ให้ Component
<Button text="คลิกที่นี่" color="blue" />

// Component รับ props
function Button({ text, color }) {
  return <button style={{ color }}>{text}</button>
}
```

**คิดง่ายๆ:**
- Component = แม่พิมพ์
- Props = ข้อมูลที่เปลี่ยนแปลงได้
- Component + Props = Output ที่หลากหลาย

**สร้าง Component แรก:**

**ขั้นตอนที่ 1:** สร้างโฟลเดอร์ `components/` ในระดับเดียวกับ `app/`

**ขั้นตอนที่ 2:** สร้างไฟล์ `components/Button.tsx`

```typescript
// components/Button.tsx

// 1. กำหนด interface (โครงสร้างของ props)
interface ButtonProps {
  children: React.ReactNode;     // เนื้อหาข้างใน (ข้อความ, icon, ฯลฯ)
  onClick?: () => void;          // ฟังก์ชันที่ทำงานเมื่อคลิก (optional)
  variant?: 'primary' | 'secondary';  // รูปแบบ (optional)
}

// 2. สร้าง Component
export default function Button({ 
  children, 
  onClick, 
  variant = 'primary'  // ค่า default
}: ButtonProps) {
  // 3. กำหนด styles
  const baseClasses = 'px-4 py-2 rounded font-medium transition';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  };

  // 4. Return JSX (HTML-like syntax)
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

**🔍 อธิบายโค้ด:**

1. **Interface**: กำหนดว่า props มีอะไรบ้าง และเป็น type อะไร
   - `?` = Optional (ไม่ส่งมาก็ได้)
   - `React.ReactNode` = รับได้ทุกอย่าง (ข้อความ, Component, ฯลฯ)

2. **Default Value**: `variant = 'primary'` ถ้าไม่ส่ง variant มา จะใช้ 'primary'

3. **Template Literals**: `` `${baseClasses} ${variantClasses[variant]}` `` รวม string

4. **JSX**: เขียน HTML ใน JavaScript (แต่ต้องใช้ `className` แทน `class`)

**วิธีใช้ Component:**

```typescript
// app/page.tsx
import Button from '@/components/Button'

export default function HomePage() {
  return (
    <div>
      <h1>ทดสอบ Button</h1>
      
      {/* Primary button */}
      <Button onClick={() => alert('สวัสดี!')}>
        คลิกที่นี่
      </Button>
      
      {/* Secondary button */}
      <Button variant="secondary">
        ยกเลิก
      </Button>
    </div>
  )
}
```

**💡 Tips:**
- ชื่อ Component ต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่ (PascalCase): `Button`, `UserCard`
- ชื่อไฟล์ควรตรงกับชื่อ Component: `Button.tsx` → `function Button()`
- ใช้ `@/` เป็น shortcut ไปยังโฟลเดอร์หลัก (ไม่ต้องใช้ `../../`)

**⚠️ ข้อควรระวัง:**
- Component ต้อง return เพียง 1 element เท่านั้น (ถ้าหลายตัวต้องครอบด้วย `<div>` หรือ `<>...</>`)
- Props เป็น **read-only** ไม่สามารถแก้ไขได้ใน Component
- ใน Next.js 13+ Component ส่วนใหญ่เป็น Server Component (ไม่มี interactivity)
  - ถ้าต้องการ onClick, useState ต้องเพิ่ม `'use client'` บรรทัดแรก

### ช่วงบ่าย (4 ชั่วโมง)

#### 1.6 Styling ด้วย Tailwind CSS (1 ชั่วโมง)

**💡 พื้นฐาน: CSS คืออะไร?**

CSS (Cascading Style Sheets) คือภาษาที่ใช้จัดแต่ง HTML:
- กำหนดสี, ขนาด, ระยะห่าง
- จัด Layout
- ทำ Animation

**CSS แบบปกติ:**
```css
.button {
  padding: 16px;
  background-color: blue;
  color: white;
  border-radius: 8px;
}
```

**🎨 Tailwind CSS คืออะไร?**

Tailwind CSS คือ **Utility-first CSS Framework** = ใช้ class สำเร็จรูปแทนการเขียน CSS เอง

**ข้อดี:**
- ⚡ เขียนได้เร็ว ไม่ต้องสลับไฟล์ CSS
- 🎯 เห็นผลทันที ไม่ต้องนึก class name
- 📦 Bundle size เล็ก (เอาเฉพาะที่ใช้)
- 🔄 Responsive ง่าย
- 🎨 สีและค่าต่างๆ สม่ำเสมอ

**ข้อเสีย:**
- HTML ดูยาว (แต่อ่านง่ายเมื่อชิน)
- ต้องท่อง class (แต่มี autocomplete ช่วย)

**ตัวอย่างการใช้งาน:**

```typescript
// ❌ แบบเดิม: เขียน CSS แยก
<button className="my-button">Click</button>
// + ไฟล์ .css แยก

// ✅ แบบ Tailwind: ใช้ class สำเร็จรูป
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Click
</button>
```

**📚 Class ที่ใช้บ่อย:**

**1. Layout & Spacing:**
```typescript
// Flexbox
<div className="flex items-center justify-between">
  // flex = display: flex
  // items-center = จัดตรงกลางแนวตั้ง
  // justify-between = กระจายซ้าย-ขวา
</div>

// Grid
<div className="grid grid-cols-3 gap-4">
  // grid-cols-3 = 3 คอลัมน์
  // gap-4 = ระยะห่าง 16px
</div>

// Padding & Margin
<div className="p-4 m-2">
  // p-4 = padding: 16px (4 × 4px)
  // m-2 = margin: 8px (2 × 4px)
</div>

// Padding เฉพาะด้าน
<div className="px-4 py-2">
  // px-4 = padding ซ้าย-ขวา
  // py-2 = padding บน-ล่าง
</div>
```

**2. Typography (ข้อความ):**
```typescript
<h1 className="text-3xl font-bold text-gray-800">
  // text-3xl = ขนาดตัวอักษรใหญ่
  // font-bold = ตัวหนา
  // text-gray-800 = สีเทาเข้ม
</h1>

<p className="text-sm text-gray-600">
  // text-sm = ขนาดตัวอักษรเล็ก
  // text-gray-600 = สีเทาอ่อนกว่า
</p>
```

**3. Colors (สี):**
```typescript
// Background
<div className="bg-blue-600">     {/* พื้นหลังสีน้ำเงิน */}
<div className="bg-red-500">      {/* สีแดง */}
<div className="bg-gray-100">     {/* สีเทาอ่อน */}

// Text color
<p className="text-white">        {/* ข้อความสีขาว */}
<p className="text-blue-600">     {/* สีน้ำเงิน */}

// เลขหลังชื่อสี: 50 (อ่อน) → 900 (เข้ม)
```

**4. Borders & Rounded:**
```typescript
<div className="border border-gray-300 rounded-lg">
  // border = มีขอบ
  // border-gray-300 = สีขอบเทา
  // rounded-lg = มุมโค้งใหญ่
</div>
```

**5. Shadow (เงา):**
```typescript
<div className="shadow">          {/* เงาปกติ */}
<div className="shadow-md">       {/* เงาปานกลาง */}
<div className="shadow-lg">       {/* เงาใหญ่ */}
```

**6. Hover & Interactive:**
```typescript
<button className="bg-blue-600 hover:bg-blue-700 transition">
  // hover:bg-blue-700 = เมื่อเมาส์ชี้จะเปลี่ยนสี
  // transition = เปลี่ยนแบบ smooth
  Click me
</button>
```

**7. Responsive Design:**
```typescript
<div className="text-sm md:text-lg lg:text-xl">
  // text-sm = เล็กในมือถือ
  // md:text-lg = ปานกลางในแท็บเล็ต
  // lg:text-xl = ใหญ่ในเดสก์ทอป
</div>

// Breakpoints:
// sm: 640px (มือถือใหญ่)
// md: 768px (แท็บเล็ต)
// lg: 1024px (เดสก์ทอป)
// xl: 1280px (จอใหญ่)
```

**ตัวอย่างจริง:**

```typescript
// Card Component
<div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold text-gray-800">Title</h2>
    <span className="text-sm text-gray-500">Badge</span>
  </div>
  <p className="text-gray-600 mb-4">
    รายละเอียดบางอย่าง
  </p>
  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
    คลิกที่นี่
  </button>
</div>
```

**💡 Tips สำหรับมือใหม่:**
- ติดตั้ง VS Code extension: "Tailwind CSS IntelliSense" (แนะนำ class อัตโนมัติ)
- ดู [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) ไว้เปิดอ้างอิง
- เริ่มจาก class พื้นฐานก่อน อย่าใช้ทุกอย่างตั้งแต่แรก
- copy-paste ตัวอย่างแล้วค่อยๆ ปรับ

**⚠️ ข้อควรระวัง:**
- ใช้ `className` ไม่ใช่ `class` (เพราะเป็น JSX)
- class สามารถซ้ำกันได้ ตัวหลังจะทับตัวหน้า
- ระวังการใช้ class เยอะเกินไป อาจทำให้อ่านยาก (พิจารณาสร้าง Component แยก)

#### 1.7 State Management (1.5 ชั่วโมง)

**💡 พื้นฐาน: State คืออะไร?**

State คือข้อมูลที่เปลี่ยนแปลงได้ในแอปพลิเคชัน เช่น:
- ค่า Counter (0, 1, 2, ...)
- ข้อมูลฟอร์ม (ชื่อ, email, รหัสผ่าน)
- สถานะ UI (เปิด/ปิด Modal, Loading)
- ข้อมูลที่ดึงมาจาก API

**คิดง่ายๆ:**
- **State = ความจำระยะสั้นของ Component**
- เมื่อ State เปลี่ยน → Component render ใหม่ → UI อัพเดต

**ตัวอย่างในชีวิตจริง:**
```
เหมือนเครื่องนับคน ที่ห้าง:
- State = จำนวนคน (เปลี่ยนเรื่อยๆ)
- เมื่อมีคนเข้า → เพิ่ม State
- เมื่อมีคนออก → ลด State
- หน้าจอแสดงตัวเลข → render ตาม State
```

**🎯 useState Hook**

`useState` คือเครื่องมือสำหรับเก็บและเปลี่ยน State

**Syntax พื้นฐาน:**
```typescript
const [state, setState] = useState(initialValue)
//     ↑        ↑              ↑
//   ค่า    ฟังก์ชันเปลี่ยน   ค่าเริ่มต้น
```

**ตัวอย่างที่ 1: Counter (นับเลข)**

```typescript
'use client' // ⚠️ ต้องมี เพราะใช้ interactivity

import { useState } from 'react'

export default function Counter() {
  // สร้าง State ชื่อ count เริ่มต้นที่ 0
  const [count, setCount] = useState(0)
  
  // ฟังก์ชันเพิ่มค่า
  const increment = () => {
    setCount(count + 1)  // เปลี่ยน State
  }
  
  // ฟังก์ชันลดค่า
  const decrement = () => {
    setCount(count - 1)
  }
  
  // ฟังก์ชัน Reset
  const reset = () => {
    setCount(0)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Counter</h2>
      <p className="text-4xl mb-4">Count: {count}</p>
      
      <div className="flex gap-2">
        <button 
          onClick={increment}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + เพิ่ม
        </button>
        
        <button 
          onClick={decrement}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          - ลด
        </button>
        
        <button 
          onClick={reset}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          ↻ Reset
        </button>
      </div>
    </div>
  )
}
```

**🔍 อธิบายการทำงาน:**
1. เริ่มต้น: `count = 0`
2. กดปุ่ม "+": เรียก `setCount(1)` → `count = 1` → Component render ใหม่
3. หน้าจอแสดง "Count: 1"
4. กดปุ่ม "+": เรียก `setCount(2)` → `count = 2` → render ใหม่
5. และต่อไปเรื่อยๆ

**ตัวอย่างที่ 2: Form Input (รับข้อมูลฟอร์ม)**

```typescript
'use client'

import { useState } from 'react'

export default function FormExample() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()  // ป้องกันการ refresh หน้า
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
      
      {/* แสดงค่าที่พิมพ์แบบ real-time */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>ชื่อที่พิมพ์: {name}</p>
        <p>Email ที่พิมพ์: {email}</p>
      </div>
    </form>
  )
}
```

**🔄 useEffect Hook**

`useEffect` ใช้สำหรับทำงานพิเศษ เช่น:
- ดึงข้อมูลจาก API
- Subscribe/Unsubscribe
- เปลี่ยนแปลง DOM
- Set timer

**💡 คิดง่ายๆ:**
- `useState` = เก็บข้อมูล
- `useEffect` = ทำงานเมื่อมีการเปลี่ยนแปลง

**Syntax:**
```typescript
useEffect(() => {
  // โค้ดที่ต้องการรัน
  
  return () => {
    // Cleanup (ถ้ามี)
  }
}, [dependencies])  // รันเมื่อ dependencies เปลี่ยน
```

**ตัวอย่างที่ 1: ดึงข้อมูลจาก API**

```typescript
'use client'

import { useEffect, useState } from 'react'

export default function DataFetcher() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // ฟังก์ชันดึงข้อมูล
    async function fetchData() {
      try {
        const response = await fetch('/api/data')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError('เกิดข้อผิดพลาด')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, []) // [] = รันครั้งเดียวตอน mount

  if (loading) return <div>กำลังโหลด...</div>
  if (error) return <div>Error: {error}</div>
  
  return <div>{JSON.stringify(data)}</div>
}
```

**🔍 Dependencies Array อธิบาย:**

```typescript
// ไม่มี [] = รันทุกครั้งที่ Component render
useEffect(() => {
  console.log('รันทุกครั้ง!')
})

// มี [] เปล่า = รันครั้งเดียวตอน mount
useEffect(() => {
  console.log('รันครั้งแรกครั้งเดียว!')
}, [])

// มี dependencies = รันเมื่อ dependencies เปลี่ยน
useEffect(() => {
  console.log('count เปลี่ยน!', count)
}, [count])  // รันเมื่อ count เปลี่ยน
```

**ตัวอย่างที่ 2: Document Title (เปลี่ยนชื่อแท็บเบราว์เซอร์)**

```typescript
'use client'

import { useEffect, useState } from 'react'

export default function TitleChanger() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    // เปลี่ยนชื่อแท็บตาม count
    document.title = `Count: ${count}`
    
    // Cleanup: เปลี่ยนกลับเมื่อออกจากหน้า
    return () => {
      document.title = 'My App'
    }
  }, [count])  // รันเมื่อ count เปลี่ยน

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        เพิ่ม
      </button>
    </div>
  )
}
```

**💡 Tips:**
- ใช้ `'use client'` บรรทัดแรกเสมอเมื่อใช้ useState/useEffect
- ตั้งชื่อ State ให้สื่อความหมาย: `[isOpen, setIsOpen]` ไม่ใช่ `[x, setX]`
- ใช้ `setCount(prev => prev + 1)` ถ้าต้องการใช้ค่าเดิม (ปลอดภัยกว่า)

**⚠️ ข้อควรระวัง:**
- **อย่าเปลี่ยน State โดยตรง**: `count++` ❌ ต้องใช้ `setCount(count + 1)` ✅
- **useEffect แบบไม่มี dependencies** อาจทำให้เกิด infinite loop
- **Cleanup function** สำคัญ! ป้องกัน memory leak
- ใน Next.js 13+ พยายามใช้ Server Component ให้มากที่สุด (ไม่ต้อง 'use client')

#### 1.8 API Routes (1.5 ชั่วโมง)

**💡 พื้นฐาน: API คืออะไร?**

API (Application Programming Interface) คือช่องทางสื่อสารระหว่าง Frontend กับ Backend:

```
Frontend (หน้าบ้าน)  ←→  API (ประตู)  ←→  Backend/Database (หลังบ้าน)
   React/Next.js              ↕              ข้อมูล, ฐานข้อมูล
```

**ตัวอย่างในชีวิตจริง:**
```
เหมือนสั่งอาหารที่ร้าน:
1. คุณ (Frontend) = บอกพนักงาน "ขอข้าวผัด 1 จาน"
2. พนักงาน (API) = ส่งออเดอร์ไปครัว
3. ครัว (Backend) = ทำอาหาร
4. พนักงาน (API) = เอาอาหารมาให้
5. คุณ (Frontend) = ได้รับอาหาร
```

**🌐 HTTP Methods (คำสั่งหลัก)**

| Method | ความหมาย | ใช้งาน |
|--------|---------|--------|
| GET | อ่าน/ดึงข้อมูล | ดูรายการ, ดูรายละเอียด |
| POST | สร้าง | เพิ่มข้อมูลใหม่ |
| PUT | แก้ไข (ทั้งหมด) | อัพเดตข้อมูล |
| PATCH | แก้ไข (บางส่วน) | อัพเดตบางฟิลด์ |
| DELETE | ลบ | ลบข้อมูล |

**💡 REST API Naming Convention:**
```
GET    /api/users       → ดูรายการ users ทั้งหมด
GET    /api/users/123   → ดู user ID 123
POST   /api/users       → สร้าง user ใหม่
PUT    /api/users/123   → แก้ไข user ID 123
DELETE /api/users/123   → ลบ user ID 123
```

**🚀 API Routes ใน Next.js**

Next.js ให้เราสร้าง API ได้ในตัว ไม่ต้องแยก Backend:
- สร้างไฟล์ `route.ts` ในโฟลเดอร์ `app/api/`
- แต่ละ HTTP Method = 1 Function
- Return ด้วย `NextResponse.json()`

**โครงสร้างไฟล์:**
```
app/
└── api/
    ├── users/
    │   ├── route.ts           → /api/users
    │   └── [id]/
    │       └── route.ts       → /api/users/:id
    └── products/
        └── route.ts           → /api/products
```

**ตัวอย่างที่ 1: GET Request (ดึงข้อมูล)**

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

// GET /api/users - ดูรายการ users ทั้งหมด
export async function GET() {
  // Mock data (ในโปรเจกต์จริงจะดึงจาก Database)
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
  ]
  
  // Return JSON response
  return NextResponse.json(users)
}
```

**🔍 อธิบาย:**
- `export async function GET()` = สร้าง endpoint GET
- `NextResponse.json(data)` = return ข้อมูลเป็น JSON
- เมื่อเรียก `fetch('/api/users')` จะได้ array ของ users

**ตัวอย่างที่ 2: POST Request (สร้างข้อมูล)**

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

// Mock data storage (ในโปรเจกต์จริงใช้ Database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
]

// GET /api/users
export async function GET() {
  return NextResponse.json(users)
}

// POST /api/users - สร้าง user ใหม่
export async function POST(request: Request) {
  // 1. อ่านข้อมูลจาก request body
  const body = await request.json()
  
  // 2. Validate (ตรวจสอบความถูกต้อง)
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: 'ต้องระบุ name และ email' },
      { status: 400 }  // Bad Request
    )
  }
  
  // 3. สร้าง user ใหม่
  const newUser = {
    id: users.length + 1,
    name: body.name,
    email: body.email,
    role: body.role || 'user'  // Default role
  }
  
  // 4. เพิ่มเข้า array
  users.push(newUser)
  
  // 5. Return user ที่สร้าง + status 201
  return NextResponse.json(newUser, { status: 201 })
}
```

**📤 วิธีเรียกใช้จาก Frontend:**

```typescript
// สร้าง user ใหม่
async function createUser() {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'New User',
      email: 'new@example.com',
      role: 'user'
    })
  })
  
  const data = await response.json()
  console.log('User created:', data)
}
```

**ตัวอย่างที่ 3: Dynamic API Route (รับพารามิเตอร์)**

```typescript
// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server'

// Mock data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
]

// GET /api/users/123 - ดู user ID 123
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id)
  
  // หา user จาก ID
  const user = users.find(u => u.id === userId)
  
  if (!user) {
    return NextResponse.json(
      { error: 'ไม่พบ user' },
      { status: 404 }  // Not Found
    )
  }
  
  return NextResponse.json(user)
}

// PUT /api/users/123 - แก้ไข user ID 123
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id)
  const body = await request.json()
  
  // หา index ของ user
  const index = users.findIndex(u => u.id === userId)
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'ไม่พบ user' },
      { status: 404 }
    )
  }
  
  // อัพเดต user
  users[index] = {
    ...users[index],  // เก็บค่าเดิม
    ...body           // อัพเดตด้วยค่าใหม่
  }
  
  return NextResponse.json(users[index])
}

// DELETE /api/users/123 - ลบ user ID 123
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id)
  
  // กรอง (ลบ) user ที่มี ID ตรงกัน
  users = users.filter(u => u.id !== userId)
  
  return NextResponse.json({ success: true })
}
```

**ตัวอย่างที่ 4: Error Handling (จัดการ Error)**

```typescript
// app/api/products/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // สมมติว่าดึงข้อมูลจาก Database
    // const products = await db.product.findMany()
    
    const products = [
      { id: 1, name: 'Laptop', price: 1299.99 }
    ]
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' },
      { status: 500 }  // Internal Server Error
    )
  }
}
```

**📊 HTTP Status Codes ที่ใช้บ่อย:**

| Code | ความหมาย | เมื่อไหร่ใช้ |
|------|---------|-------------|
| 200 | OK | สำเร็จ (GET, PUT, PATCH) |
| 201 | Created | สร้างสำเร็จ (POST) |
| 204 | No Content | สำเร็จแต่ไม่มีข้อมูล return |
| 400 | Bad Request | ข้อมูลผิดพลาด |
| 401 | Unauthorized | ไม่ได้ login |
| 403 | Forbidden | ไม่มีสิทธิ์เข้าถึง |
| 404 | Not Found | ไม่พบข้อมูล |
| 500 | Internal Server Error | เกิดข้อผิดพลาดในเซิร์ฟเวอร์ |

**💡 Tips:**
- ตั้งชื่อ API endpoint เป็นพหูพจน์: `/api/users` ไม่ใช่ `/api/user`
- ใช้ HTTP Status Code ให้ถูกต้อง ช่วยให้ Frontend เข้าใจ
- Validate ข้อมูลที่ส่งเข้ามาเสมอ
- ใช้ try-catch เพื่อจัดการ error

**⚠️ ข้อควรระวัง:**
- API Routes เป็น Server-side code ทำงานบน server ไม่ใช่ browser
- **อย่าเก็บ sensitive data** (password, API keys) ใน Frontend
- ใช้ Environment Variables สำหรับ secrets
- Validate input ทุกครั้ง! อย่าเชื่อใจข้อมูลจาก client
- ใน Production ควรใช้ Database จริง ไม่ใช่ in-memory array

### 🏠 การบ้านวันที่ 1

1. สร้างหน้า About (`/about`)
2. สร้าง Component Card ที่รับ props (title, description)
3. สร้าง API Route `/api/products` ที่ return รายการสินค้า
4. ทำ Counter Component ที่มีปุ่ม +, - และ Reset

---

## 🚀 วันที่ 2: สร้าง Admin Panel

### ช่วงเช้า (4 ชั่วโมง)

#### 2.1 วางแผน Admin Panel (30 นาที)

**💡 พื้นฐาน: Admin Panel คืออะไร?**

Admin Panel (หรือ Dashboard) คือส่วนหลังบ้านสำหรับจัดการข้อมูลและระบบ:
- เฉพาะ Admin/ผู้ดูแลระบบเข้าถึงได้
- จัดการข้อมูล (Users, Products, Orders)
- ดูสถิติและรายงาน
- ตั้งค่าต่างๆ ของระบบ

**ตัวอย่างในชีวิตจริง:**
```
เหมือนระบบหลังบ้านของร้านค้า:
- พนักงาน (Frontend) = รับออเดอร์จากลูกค้า
- ผู้จัดการ (Admin Panel) = ดูยอดขาย, จัดการพนักงาน, เพิ่มสินค้า
```

**🎯 องค์ประกอบหลักของ Admin Panel:**

1. **Navigation (เมนู)** - Sidebar หรือ Top menu
2. **Dashboard** - หน้าภาพรวม (สถิติ, กราฟ)
3. **CRUD Pages** - หน้าจัดการข้อมูล (Create, Read, Update, Delete)
4. **Forms** - ฟอร์มเพิ่ม/แก้ไขข้อมูล
5. **Tables/Lists** - แสดงข้อมูลในรูปแบบตาราง
6. **Authentication** - ระบบ Login/Logout

**Features ที่จะทำ:**
- 📊 **Dashboard** (ภาพรวม) - สถิติ users, products, orders
- 👥 **User Management** (CRUD) - เพิ่ม/แก้ไข/ลบ users
- 📦 **Product Management** (CRUD) - เพิ่ม/แก้ไข/ลบ products
- 🔐 **Authentication** (Login/Logout) - ป้องกันการเข้าถึง
- 📱 **Responsive Design** - ใช้งานได้ทุกอุปกรณ์

**โครงสร้างหน้าที่จะสร้าง:**
```
/admin
├── /login              # หน้า Login (ไม่มี layout admin)
├── /dashboard          # Dashboard หลัก (มี sidebar)
├── /users              # จัดการ Users
│   ├── /               # รายการ users (table)
│   ├── /new           # เพิ่ม user ใหม่ (form)
│   └── /[id]/edit     # แก้ไข user (form)
├── /products          # จัดการ Products
│   ├── /               # รายการ products (cards)
│   ├── /new
│   └── /[id]/edit
```

**🎨 UI/UX Best Practices:**

1. **Consistency (ความสม่ำเสมอ)**
   - ใช้สีเดียวกันทั้งหมด
   - ปุ่มขนาดและรูปร่างเหมือนกัน
   - ระยะห่างสม่ำเสมอ

2. **Clear Navigation (นำทางชัดเจน)**
   - แสดงว่าอยู่หน้าไหน (active state)
   - เมนูเรียงตามลำดับความสำคัญ
   - มี breadcrumb (เส้นทางการนำทาง)

3. **Feedback (แจ้งเตือน)**
   - แสดงสถานะ Loading
   - แจ้งเมื่อสำเร็จ/ผิดพลาด
   - Confirm ก่อนลบข้อมูล

4. **Responsive Design**
   - Sidebar ซ่อนได้ใน mobile
   - Table เลื่อนได้แนวนอน
   - ปุ่มขนาดใหญ่พอสำหรับมือถือ

**💡 Tips การออกแบบ:**
- เริ่มจาก Desktop แล้วค่อย adapt เป็น Mobile
- ใช้สีเข้มสำหรับ Sidebar (professional look)
- Dashboard ใช้สีสันสดใส (cards, charts)
- ปุ่มสำคัญใช้สีโดดเด่น (Primary color)

**⚠️ ข้อควรระวัง:**
- อย่าใส่ feature มากเกินไป (Keep it simple!)
- ทดสอบบน Mobile ด้วย (50%+ ของ traffic อาจมาจาก mobile)
- ใส่ Confirmation เมื่อลบข้อมูล (ป้องกันลบผิด)

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

**💡 พื้นฐาน: Authentication คืออะไร?**

Authentication (การยืนยันตัวตน) คือการตรวจสอบว่าผู้ใช้เป็นใครจริงๆ:

```
Authentication = "คุณคือใคร?"
Authorization = "คุณมีสิทธิ์ทำอะไรได้บ้าง?"
```

**ตัวอย่างในชีวิตจริง:**
```
เหมือนการเข้าอาคาร:
1. Authentication = แสดงบัตรประชาชน (พิสูจน์ว่าคุณคือใคร)
2. Authorization = เจ้าหน้าที่ตรวจสอบว่าคุณมีชื่อในรายการผู้เข้าพบหรือไม่
```

**🔐 วิธีการ Authentication ที่นิยม:**

1. **Session-based** (แบบเดิม)
   - เก็บข้อมูล session บน server
   - ส่ง cookie ให้ browser

2. **Token-based** (นิยมใช้)
   - สร้าง token (JWT)
   - เก็บ token ใน localStorage/cookie
   - ส่ง token ใน header ทุกครั้ง

3. **OAuth** (Social login)
   - Login ด้วย Google, Facebook, GitHub
   - ใช้ NextAuth.js

**ในบทนี้เราจะใช้แบบง่าย (Demo):**
- ตรวจสอบ email/password
- สร้าง token ง่ายๆ
- เก็บใน localStorage

**💡 สำคัญ: นี่เป็น DEMO เท่านั้น!**
- ใน Production ต้องใช้ระบบที่ปลอดภัยกว่า
- แนะนำ NextAuth.js หรือ Auth0
- Password ต้อง hash (bcrypt)
- Token ต้องมีวันหมดอายุ

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
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()  // ป้องกัน page refresh
    setError('')        // ล้าง error เดิม
    setLoading(true)    // แสดง loading state

    try {
      // เรียก API login
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok) {
        // Login สำเร็จ
        localStorage.setItem('token', data.token)  // เก็บ token
        localStorage.setItem('user', JSON.stringify(data.user))  // เก็บข้อมูล user
        router.push('/admin/dashboard')  // ไปหน้า dashboard
      } else {
        // Login ไม่สำเร็จ
        setError(data.message || 'Email หรือ Password ไม่ถูกต้อง')
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setLoading(false)  // ปิด loading
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🔐 Admin Login
        </h1>
        
        {/* แสดง Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded font-medium transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'กำลัง Login...' : 'Login'}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
          <p className="font-medium mb-2">Demo Account:</p>
          <p className="text-gray-600">Email: admin@example.com</p>
          <p className="text-gray-600">Password: password</p>
        </div>
      </div>
    </div>
  )
}
```

**🔍 อธิบายโค้ด:**

1. **State Management:**
   - `email, password` = เก็บข้อมูลฟอร์ม
   - `error` = แสดง error message
   - `loading` = แสดงสถานะกำลัง loading

2. **Form Validation:**
   - `required` = บังคับกรอก
   - `type="email"` = ต้องเป็นรูปแบบ email
   - `e.preventDefault()` = ป้องกัน page refresh

3. **Error Handling:**
   - `try-catch` = จัดการ error
   - แสดง error message ให้ user เห็น
   - `finally` = ทำงานไม่ว่าสำเร็จหรือไม่ (ปิด loading)

**Login API:**
```typescript
// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // TODO: ตรวจสอบกับ Database
  // const user = await db.user.findUnique({ where: { email } })
  // const isValid = await bcrypt.compare(password, user.password)
  
  // สำหรับ Demo: ใช้ข้อมูลตายตัว
  if (email === 'admin@example.com' && password === 'password') {
    // Login สำเร็จ
    return NextResponse.json({
      success: true,
      token: 'demo-token-' + Date.now(),  // สร้าง token
      user: {
        id: 1,
        email: email,
        name: 'Admin User',
        role: 'admin'
      }
    })
  }

  // Login ไม่สำเร็จ
  return NextResponse.json(
    { 
      success: false, 
      message: 'Email หรือ Password ไม่ถูกต้อง' 
    },
    { status: 401 }  // Unauthorized
  )
}
```

**🛡️ Protected Route (ป้องกันหน้าที่ต้อง login)**

```typescript
// app/admin/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ตรวจสอบว่า login หรือยัง
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      // ถ้ายังไม่ได้ login ให้ไปหน้า login
      router.push('/admin/login')
      return
    }

    // ถ้า login แล้ว
    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  if (loading) {
    return <div>กำลังตรวจสอบ...</div>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>ยินดีต้อนรับ, {user?.name}!</p>
    </div>
  )
}
```

**🚪 Logout Function:**

```typescript
// components/admin/Header.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handleLogout = () => {
    // ถามยืนยันก่อน logout
    if (confirm('ต้องการออกจากระบบหรือไม่?')) {
      // ลบข้อมูลทั้งหมด
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // ไปหน้า login
      router.push('/admin/login')
    }
  }

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center px-8 py-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          🚪 Logout
        </button>
      </div>
    </header>
  )
}
```

**💡 Tips:**
- เก็บ sensitive data (token) ใน httpOnly cookie จะปลอดภัยกว่า localStorage
- ตรวจสอบ authentication ใน Middleware สำหรับทุก route
- ใช้ NextAuth.js สำหรับ production (รองรับ OAuth, JWT, Database)

**⚠️ ข้อควรระวัง:**
- **อย่าเก็บ password แบบ plain text!** ต้อง hash ด้วย bcrypt
- **อย่าส่ง sensitive data ใน URL** (ใช้ POST body)
- **ตรวจสอบ token ทุกครั้ง** เมื่อเรียก API
- localStorage อ่านได้จาก JavaScript (ระวัง XSS attack)
- ใช้ HTTPS ใน Production (ป้องกัน Man-in-the-Middle)
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
