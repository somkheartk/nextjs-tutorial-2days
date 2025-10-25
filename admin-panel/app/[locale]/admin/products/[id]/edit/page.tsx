'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import ProductForm from '@/components/admin/ProductForm'
import { Typography, Box, CircularProgress } from '@mui/material'
import { getProductById, Product } from '@/lib/api-service'

export default function EditProductPage() {
  const params = useParams()
  const t = useTranslations()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Using external API service instead of Next.js internal API
        const data = await getProductById(Number(params.id))
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
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
