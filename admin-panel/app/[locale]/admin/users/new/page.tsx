'use client'

import UserForm from '@/components/admin/UserForm'
import { Box } from '@mui/material'
import PageHeader from '@/components/ui/PageHeader'
import { useTranslations } from 'next-intl'

export default function NewUserPage() {
  const t = useTranslations()
  
  return (
    <Box>
      <PageHeader title={t('users.createUser')} />
      <UserForm />
    </Box>
  )
}
