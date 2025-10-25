'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import PageHeader from '@/components/ui/PageHeader'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Chip
} from '@mui/material'
import { Edit, Delete, Add } from '@mui/icons-material'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  status: string
}

export default function ProductsPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t('common.confirmDelete', { item: t('products.title').toLowerCase() }))) return

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Box>
      <PageHeader 
        title={t('products.title')}
        action={{
          href: `/${locale}/admin/products/new`,
          label: t('products.addProduct'),
          icon: <Add />
        }}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
        {products.map((product) => (
          <Card key={product.id} elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box className="flex justify-between items-start mb-3">
                <Typography variant="h6" component="h3" fontWeight="600">
                  {product.name}
                </Typography>
                <Chip 
                  label={t(`common.${product.status}`)}
                  color={product.status === 'active' ? 'success' : 'error'}
                  size="small"
                />
              </Box>
              
              <Box className="space-y-2">
                <Box className="flex justify-between">
                  <Typography variant="body2" color="text.secondary">
                    {t('products.price')}:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    ${product.price.toFixed(2)}
                  </Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography variant="body2" color="text.secondary">
                    {t('products.category')}:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {product.category}
                  </Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography variant="body2" color="text.secondary">
                    {t('products.stock')}:
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight="500"
                    color={product.stock === 0 ? 'error.main' : 'success.main'}
                  >
                    {product.stock} {t('products.units')}
                  </Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                component={Link}
                href={`/${locale}/admin/products/${product.id}/edit`}
                variant="contained"
                startIcon={<Edit />}
                fullWidth
                size="small"
              >
                {t('common.edit')}
              </Button>
              <Button
                onClick={() => handleDelete(product.id)}
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                fullWidth
                size="small"
              >
                {t('common.delete')}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
