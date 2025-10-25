'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert
} from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'
import { login } from '@/lib/api-service'

export default function LoginPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Using external API service instead of Next.js internal API
      const data = await login(email, password)

      if (data.success && data.token) {
        localStorage.setItem('token', data.token)
        router.push(`/${locale}/admin/dashboard`)
      } else {
        setError(data.message || 'Login failed')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <Paper elevation={8} sx={{ p: 4, maxWidth: 480, width: '100%', mx: 2 }}>
        <Box className="text-center mb-6">
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            {t('auth.adminLogin')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('auth.welcomeBack')}
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            margin="normal"
            variant="outlined"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={<LoginIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? t('common.loading') : t('auth.login')}
          </Button>
        </Box>

        <Paper elevation={0} sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Demo credentials (External API):
          </Typography>
          <Typography variant="body2">
            <strong>Username:</strong> emilys (any email will work)
          </Typography>
          <Typography variant="body2">
            <strong>Password:</strong> emilyspass (any password will work)
          </Typography>
        </Paper>
      </Paper>
    </div>
  )
}
