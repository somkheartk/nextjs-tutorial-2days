/**
 * UserMenu Component
 * 
 * Displays user profile menu with avatar and logout option.
 * Extracted from Header component for better organization.
 * 
 * Design Rationale:
 * - Single responsibility: Handle user menu interactions
 * - Reduces complexity of Header component
 * - Easier to test and maintain
 * - Can be extended with profile settings, preferences, etc.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Typography,
  Divider
} from '@mui/material'
import { ExitToApp } from '@mui/icons-material'

interface User {
  name?: string
  email?: string
  role?: string
}

interface UserMenuProps {
  /** Current user data */
  user: User | null
  /** Current locale for navigation */
  locale: string
}

export default function UserMenu({ user, locale }: UserMenuProps) {
  const router = useRouter()
  const t = useTranslations()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    router.push(`/${locale}/admin/login`)
    handleClose()
  }

  return (
    <Box className="flex items-center gap-2">
      <IconButton onClick={handleOpen} size="small">
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
          {user?.name?.charAt(0) || 'A'}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2">{user?.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ExitToApp sx={{ mr: 1 }} fontSize="small" />
          {t('navigation.logout')}
        </MenuItem>
      </Menu>
    </Box>
  )
}
