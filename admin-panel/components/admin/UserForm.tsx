'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  Paper,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Stack
} from '@mui/material'
import { Save, Cancel } from '@mui/icons-material'
import { USER_ROLES, STATUSES } from '@/lib/constants'

interface UserFormProps {
  user?: {
    id?: number
    name: string
    email: string
    role: string
    status: string
  }
  isEdit?: boolean
}

export default function UserForm({ user, isEdit = false }: UserFormProps) {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    status: user?.status || 'active'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const url = isEdit ? `/api/users/${user?.id}` : '/api/users'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push(`/${locale}/admin/users`)
        router.refresh()
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom fontWeight="600">
        {isEdit ? t('users.editUser') : t('users.createUser')}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label={t('users.name')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            variant="outlined"
          />

          <TextField
            fullWidth
            type="email"
            label={t('users.email')}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            variant="outlined"
          />

          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <TextField
              fullWidth
              select
              label={t('users.role')}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              variant="outlined"
            >
              {USER_ROLES.map((role) => (
                <MenuItem key={role} value={role}>
                  {t(`users.roles.${role}`)}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label={t('users.status')}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              variant="outlined"
            >
              {STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {t(`common.${status}`)}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box className="flex gap-3">
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={<Save />}
              size="large"
            >
              {loading ? t('common.loading') : (isEdit ? t('users.updateUser') : t('users.createUser'))}
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.back()}
              startIcon={<Cancel />}
              size="large"
            >
              {t('common.cancel')}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  )
}
