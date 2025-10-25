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
import { PRODUCT_CATEGORIES, STATUSES } from '@/lib/constants'

interface ProductFormProps {
  product?: {
    id?: number
    name: string
    price: number
    category: string
    stock: number
    status: string
  }
  isEdit?: boolean
}

export default function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations()
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    category: product?.category || '',
    stock: product?.stock || 0,
    status: product?.status || 'active'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const url = isEdit ? `/api/products/${product?.id}` : '/api/products'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push(`/${locale}/admin/products`)
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
        {isEdit ? t('products.editProduct') : t('products.createProduct')}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label={t('products.name')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            variant="outlined"
          />

          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <TextField
              fullWidth
              type="number"
              label={t('products.price')}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
              variant="outlined"
              inputProps={{ step: '0.01', min: '0' }}
            />

            <TextField
              fullWidth
              select
              label={t('products.category')}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              variant="outlined"
            >
              {PRODUCT_CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <TextField
              fullWidth
              type="number"
              label={t('products.stock')}
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              required
              variant="outlined"
              inputProps={{ min: '0' }}
            />

            <TextField
              fullWidth
              select
              label={t('products.status')}
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
              {loading ? t('common.loading') : (isEdit ? t('products.updateProduct') : t('products.createProduct'))}
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
