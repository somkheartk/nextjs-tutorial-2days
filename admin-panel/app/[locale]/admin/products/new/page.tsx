'use client'

import ProductForm from '@/components/admin/ProductForm'
import { Box } from '@mui/material'
import PageHeader from '@/components/ui/PageHeader'
import { useTranslations } from 'next-intl'

export default function NewProductPage() {
  const t = useTranslations()
  
  return (
    <Box>
      <PageHeader title={t('products.createProduct')} />
      <ProductForm />
    </Box>
  )
}
