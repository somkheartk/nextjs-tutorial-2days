'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import UserForm from '@/components/admin/UserForm'
import { Typography, Box, CircularProgress } from '@mui/material'
import { getUserById, User } from '@/lib/api-service'

export default function EditUserPage() {
  const params = useParams()
  const t = useTranslations()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Using external API service instead of Next.js internal API
        const data = await getUserById(Number(params.id))
        setUser(data)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
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
