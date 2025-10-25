'use client'

import { useTranslations } from 'next-intl'
import { useAdmin } from '@/lib/AdminContext'
import { Box, Divider } from '@mui/material'
import UserMenu from './UserMenu'
import LanguageSwitcher from './LanguageSwitcher'
import RoleSwitcher from './RoleSwitcher'

export default function Header() {
  const t = useTranslations()
  const { currentUser, switchRole, currentLocale, switchLocale } = useAdmin()

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {t('navigation.adminPanel')}
          </h2>
        </div>

        <Box className="flex items-center gap-2">
          {/* Role Switcher */}
          <RoleSwitcher 
            currentRole={currentUser?.role || 'user'}
            onRoleChange={switchRole}
          />

          {/* Language Switcher */}
          <LanguageSwitcher 
            currentLocale={currentLocale}
            onLocaleChange={switchLocale}
          />

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          {/* User Menu */}
          <UserMenu 
            user={currentUser}
            locale={currentLocale}
          />
        </Box>
      </div>
    </header>
  )
}
