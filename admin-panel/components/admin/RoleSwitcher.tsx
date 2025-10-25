/**
 * RoleSwitcher Component
 * 
 * Role selection dropdown for switching user roles (demo purposes).
 * Extracted from Header component for better organization.
 * 
 * Design Rationale:
 * - Single responsibility: Handle role switching
 * - Makes Header component less complex
 * - Can be removed or modified easily for production
 * - Useful for testing different role permissions
 */

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { IconButton, Menu, MenuItem, Chip, Box, Typography } from '@mui/material'
import { SwapHoriz } from '@mui/icons-material'
import { USER_ROLES } from '@/lib/constants'

interface RoleSwitcherProps {
  /** Current user role */
  currentRole: string
  /** Callback when role is changed */
  onRoleChange: (role: string) => void
}

export default function RoleSwitcher({ 
  currentRole, 
  onRoleChange 
}: RoleSwitcherProps) {
  const t = useTranslations()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRoleChange = (role: string) => {
    onRoleChange(role)
    handleClose()
  }

  return (
    <>
      {/* Current Role Display */}
      <Box className="hidden md:flex items-center gap-2 mr-2">
        <Typography variant="body2" color="textSecondary">
          {t('roleSwitch.currentRole')}:
        </Typography>
        <Chip 
          label={t(`users.roles.${currentRole}`)}
          color="primary"
          size="small"
          variant="outlined"
        />
      </Box>

      {/* Role Switcher Button */}
      <IconButton 
        onClick={handleOpen}
        size="small"
        sx={{ color: 'text.secondary' }}
        title={t('roleSwitch.switchRole')}
      >
        <SwapHoriz />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {USER_ROLES.map((role) => (
          <MenuItem 
            key={role} 
            onClick={() => handleRoleChange(role)}
            selected={currentRole === role}
          >
            {t(`users.roles.${role}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
