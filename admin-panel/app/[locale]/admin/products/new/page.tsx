'use client'

import ProductForm from '@/components/admin/ProductForm'
import { useTranslations } from 'next-intl'
import { Typography, Box } from '@mui/material'

export default function NewProductPage() {
  const t = useTranslations()
  
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="text.primary">
        {t('products.createProduct')}
      </Typography>
      <ProductForm />
    </Box>
  )
}
