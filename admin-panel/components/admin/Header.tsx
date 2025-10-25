'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAdmin } from '@/lib/AdminContext'
import { 
  Menu as MenuIcon,
  Language as LanguageIcon,
  AccountCircle,
  SwapHoriz,
  ExitToApp
} from '@mui/icons-material'
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  Box,
  Typography,
  Divider
} from '@mui/material'
import { useState } from 'react'

export default function Header() {
  const router = useRouter()
  const t = useTranslations()
  const { currentUser, switchRole, currentLocale, switchLocale } = useAdmin()
  
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null)
  const [anchorElRole, setAnchorElRole] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget)
  }

  const handleOpenRoleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElRole(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleCloseLangMenu = () => {
    setAnchorElLang(null)
  }

  const handleCloseRoleMenu = () => {
    setAnchorElRole(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    router.push(`/${currentLocale}/admin/login`)
    handleCloseUserMenu()
  }

  const handleLanguageChange = (locale: string) => {
    switchLocale(locale)
    handleCloseLangMenu()
  }

  const handleRoleChange = (role: string) => {
    switchRole(role)
    handleCloseRoleMenu()
  }

  const availableRoles = ['admin', 'user', 'moderator', 'editor', 'manager']

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {t('navigation.adminPanel')}
          </h2>
        </div>

        <Box className="flex items-center gap-2">
          {/* Current Role Display */}
          <Box className="hidden md:flex items-center gap-2 mr-2">
            <Typography variant="body2" color="textSecondary">
              {t('roleSwitch.currentRole')}:
            </Typography>
            <Chip 
              label={currentUser?.role ? t(`users.roles.${currentUser.role}`) : ''}
              color="primary"
              size="small"
              variant="outlined"
            />
          </Box>

          {/* Role Switcher */}
          <IconButton 
            onClick={handleOpenRoleMenu}
            size="small"
            sx={{ color: 'text.secondary' }}
            title={t('roleSwitch.switchRole')}
          >
            <SwapHoriz />
          </IconButton>
          <Menu
            anchorEl={anchorElRole}
            open={Boolean(anchorElRole)}
            onClose={handleCloseRoleMenu}
          >
            {availableRoles.map((role) => (
              <MenuItem 
                key={role} 
                onClick={() => handleRoleChange(role)}
                selected={currentUser?.role === role}
              >
                {t(`users.roles.${role}`)}
              </MenuItem>
            ))}
          </Menu>

          {/* Language Switcher */}
          <IconButton 
            onClick={handleOpenLangMenu}
            size="small"
            sx={{ color: 'text.secondary' }}
            title={t('language.switchLanguage')}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElLang}
            open={Boolean(anchorElLang)}
            onClose={handleCloseLangMenu}
          >
            <MenuItem 
              onClick={() => handleLanguageChange('en')}
              selected={currentLocale === 'en'}
            >
              {t('language.english')}
            </MenuItem>
            <MenuItem 
              onClick={() => handleLanguageChange('th')}
              selected={currentLocale === 'th'}
            >
              {t('language.thai')}
            </MenuItem>
          </Menu>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          {/* User Menu */}
          <Box className="flex items-center gap-2">
            <IconButton onClick={handleOpenUserMenu} size="small">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {currentUser?.name?.charAt(0) || 'A'}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2">{currentUser?.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentUser?.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} fontSize="small" />
                {t('navigation.logout')}
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </div>
    </header>
  )
}
