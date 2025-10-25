'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import UserForm from '@/components/admin/UserForm'
import { Typography, Box, CircularProgress } from '@mui/material'

export default function EditUserPage() {
  const params = useParams()
  const t = useTranslations()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <Box className="flex items-center justify-center h-64">
        <CircularProgress />
      </Box>
    )
  }
  
  if (!user) {
    return (
      <Typography variant="h6" color="error">User not found</Typography>
    )
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="text.primary">
        {t('users.editUser')}
      </Typography>
      <UserForm user={user} isEdit />
    </Box>
  )
}
