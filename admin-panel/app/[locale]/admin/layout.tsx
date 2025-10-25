'use client'

import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'
import { AdminProvider } from '@/lib/AdminContext'
import { useParams } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const locale = params.locale as string

  return (
    <AdminProvider locale={locale}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  )
}
