'use client'

import UserForm from '@/components/admin/UserForm'
import { useTranslations } from 'next-intl'
import { Typography, Box } from '@mui/material'

export default function NewUserPage() {
  const t = useTranslations()
  
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="text.primary">
        {t('users.createUser')}
      </Typography>
      <UserForm />
    </Box>
  )
}
