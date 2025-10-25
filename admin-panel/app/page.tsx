import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center text-white p-8">
        <h1 className="text-6xl font-bold mb-4">Next.js Tutorial 2 Days</h1>
        <h2 className="text-3xl mb-8">เรียนรู้ Next.js ใน 2 วัน</h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          คอร์สเรียน Next.js แบบเข้มข้น สอนตั้งแต่เริ่มต้นจนสร้าง Admin Panel ที่สมบูรณ์
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/admin/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            🚀 ไปที่ Admin Panel
          </Link>
          <a
            href="https://github.com/somkheartk/nextjs-tutorial-2days"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-700 transition shadow-lg"
          >
            📚 ดู Tutorial
          </a>
        </div>

        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-3">Demo Credentials</h3>
          <p className="text-sm">Email: <strong>admin@example.com</strong></p>
          <p className="text-sm">Password: <strong>password</strong></p>
        </div>
      </div>
    </div>
  )
}
