'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'

export default function EditProductPage() {
  const params = useParams()
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

  if (loading) return <div>Loading...</div>
  if (!product) return <div>Product not found</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h1>
      <ProductForm product={product} isEdit />
    </div>
  )
}
