'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import ProductForm from '@/components/admin/ProductForm'
import { Typography, Box, CircularProgress } from '@mui/material'

export default function EditProductPage() {
  const params = useParams()
  const t = useTranslations()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
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
  
  if (!product) {
    return (
      <Typography variant="h6" color="error">Product not found</Typography>
    )
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="text.primary">
        {t('products.editProduct')}
      </Typography>
      <ProductForm product={product} isEdit />
    </Box>
  )
}
