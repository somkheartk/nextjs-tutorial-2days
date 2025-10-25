# Deployment Guide - คู่มือการ Deploy

## การ Deploy บน Vercel (แนะนำ)

Vercel เป็น platform ที่สร้างโดยทีมเดียวกับ Next.js และเหมาะสมที่สุดสำหรับ Deploy Next.js

### ขั้นตอนการ Deploy

#### 1. เตรียมโปรเจกต์

```bash
# ตรวจสอบว่า build สำเร็จ
cd admin-panel
npm run build
```

#### 2. Push โค้ดขึ้น GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push
```

#### 3. Deploy บน Vercel

**Option A: ผ่าน Vercel Dashboard**

1. ไปที่ [vercel.com](https://vercel.com)
2. Sign in ด้วย GitHub
3. คลิก "New Project"
4. เลือก repository: `nextjs-tutorial-2days`
5. Root Directory: เลือก `admin-panel`
6. คลิก "Deploy"

**Option B: ผ่าน Vercel CLI**

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd admin-panel
vercel

# Deploy production
vercel --prod
```

#### 4. ตั้งค่า Environment Variables (ถ้ามี)

ใน Vercel Dashboard:
1. ไปที่ Project Settings
2. เลือก "Environment Variables"
3. เพิ่ม variables เช่น `DATABASE_URL`, `JWT_SECRET`

### Configuration

สร้างไฟล์ `vercel.json` ใน `admin-panel/` (optional):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

---

## การ Deploy บน Netlify

### ขั้นตอน

1. ไปที่ [netlify.com](https://netlify.com)
2. "New site from Git"
3. เลือก repository
4. Build settings:
   - Base directory: `admin-panel`
   - Build command: `npm run build`
   - Publish directory: `admin-panel/.next`
5. Deploy

### netlify.toml

สร้างไฟล์ `netlify.toml` ใน root:

```toml
[build]
  base = "admin-panel"
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## การ Deploy บน Railway

Railway เหมาะสำหรับ full-stack apps ที่ต้องการ database

### ขั้นตอน

1. ไปที่ [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. เลือก repository
4. Railway จะ detect Next.js อัตโนมัติ
5. ตั้งค่า:
   - Root Directory: `admin-panel`
   - Start Command: `npm start`

---

## การ Deploy บน Docker

### Dockerfile

สร้างไฟล์ `admin-panel/Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### อัปเดต next.config.ts

```typescript
const nextConfig = {
  output: 'standalone',
}

export default nextConfig
```

### Build และ Run

```bash
# Build image
docker build -t nextjs-admin-panel .

# Run container
docker run -p 3000:3000 nextjs-admin-panel
```

---

## การ Deploy บน VPS (Ubuntu/Debian)

### 1. เตรียม Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# ติดตั้ง Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# ติดตั้ง PM2
sudo npm install -g pm2
```

### 2. Clone และ Setup

```bash
# Clone repository
git clone https://github.com/somkheartk/nextjs-tutorial-2days.git
cd nextjs-tutorial-2days/admin-panel

# ติดตั้ง dependencies
npm install

# Build
npm run build
```

### 3. รันด้วย PM2

```bash
# Start app
pm2 start npm --name "admin-panel" -- start

# Save PM2 config
pm2 save

# Auto-start on boot
pm2 startup
```

### 4. ตั้งค่า Nginx (Reverse Proxy)

```bash
# ติดตั้ง Nginx
sudo apt install nginx -y

# สร้าง config
sudo nano /etc/nginx/sites-available/admin-panel
```

เพิ่ม config:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable และ restart:

```bash
sudo ln -s /etc/nginx/sites-available/admin-panel /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. ตั้งค่า SSL ด้วย Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

---

## Environment Variables

### Production Environment Variables

```env
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-super-secret-key
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret
```

### ความปลอดภัย

⚠️ **สำคัญ:**
- ห้ามเก็บ secrets ใน git
- ใช้ environment variables สำหรับ sensitive data
- เปลี่ยน demo credentials ก่อน deploy production

---

## Checklist ก่อน Deploy

- [ ] ทดสอบ build locally: `npm run build`
- [ ] ตั้งค่า environment variables
- [ ] อัปเดต CORS settings
- [ ] เปลี่ยน demo credentials
- [ ] ตั้งค่า proper authentication
- [ ] เชื่อมต่อ production database
- [ ] ตั้งค่า error monitoring
- [ ] เพิ่ม analytics
- [ ] ตั้งค่า backup
- [ ] Test บน production domain

---

## Performance Optimization

### 1. Image Optimization

```typescript
import Image from 'next/image'

<Image
  src="/photo.jpg"
  width={500}
  height={300}
  alt="Description"
  priority // สำหรับรูปสำคัญ
/>
```

### 2. Font Optimization

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

### 3. Enable Compression

ใน `next.config.ts`:

```typescript
const nextConfig = {
  compress: true,
  // ...
}
```

### 4. Analyze Bundle

```bash
npm install @next/bundle-analyzer

# ใน next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

---

## Monitoring & Debugging

### Error Tracking

แนะนำให้ใช้:
- [Sentry](https://sentry.io)
- [LogRocket](https://logrocket.com)
- [Datadog](https://www.datadoghq.com)

### Analytics

- [Vercel Analytics](https://vercel.com/analytics)
- [Google Analytics](https://analytics.google.com)
- [Plausible](https://plausible.io)

---

## Troubleshooting

### Build Failures

```bash
# ลบ cache
rm -rf .next node_modules
npm install
npm run build
```

### Memory Issues

```bash
# เพิ่ม memory limit
NODE_OPTIONS='--max-old-space-size=4096' npm run build
```

### Port Already in Use

```bash
# หา process ที่ใช้ port
lsof -ti:3000 | xargs kill -9
```

---

## ทรัพยากรเพิ่มเติม

- 📖 [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- 🚀 [Vercel Documentation](https://vercel.com/docs)
- 🐳 [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- 🔒 [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)

---

**Good luck with your deployment! 🎉**
