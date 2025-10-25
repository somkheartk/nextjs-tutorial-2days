/**
 * LanguageSwitcher Component
 * 
 * Language selection dropdown for switching between locales.
 * Extracted from Header component for better organization.
 * 
 * Design Rationale:
 * - Single responsibility: Handle language switching
 * - Reusable in other contexts (footer, settings page)
 * - Easier to test independently
 * - Can be extended with more languages easily
 */

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { Language as LanguageIcon } from '@mui/icons-material'
import { AVAILABLE_LOCALES } from '@/lib/constants'

interface LanguageSwitcherProps {
  /** Current active locale */
  currentLocale: string
  /** Callback when locale is changed */
  onLocaleChange: (locale: string) => void
}

export default function LanguageSwitcher({ 
  currentLocale, 
  onLocaleChange 
}: LanguageSwitcherProps) {
  const t = useTranslations()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (locale: string) => {
    onLocaleChange(locale)
    handleClose()
  }

  return (
    <>
      <IconButton 
        onClick={handleOpen}
        size="small"
        sx={{ color: 'text.secondary' }}
        title={t('language.switchLanguage')}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {AVAILABLE_LOCALES.map((locale) => (
          <MenuItem 
            key={locale.code}
            onClick={() => handleLanguageChange(locale.code)}
            selected={currentLocale === locale.code}
          >
            {t(locale.labelKey)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
