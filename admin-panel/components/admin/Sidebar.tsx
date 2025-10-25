'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Dashboard, People, Inventory } from '@mui/icons-material'

export default function Sidebar() {
  const pathname = usePathname()
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations()

  const menuItems = [
    { href: `/${locale}/admin/dashboard`, label: t('navigation.dashboard'), icon: Dashboard },
    { href: `/${locale}/admin/users`, label: t('navigation.users'), icon: People },
    { href: `/${locale}/admin/products`, label: t('navigation.products'), icon: Inventory },
  ]

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-2xl font-bold mb-8 px-4">
        <Link href={`/${locale}/admin/dashboard`}>
          {t('navigation.adminPanel')}
        </Link>
      </div>
      <nav>
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
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
              <Icon fontSize="small" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
