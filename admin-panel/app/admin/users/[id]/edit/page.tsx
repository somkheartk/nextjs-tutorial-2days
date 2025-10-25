'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import UserForm from '@/components/admin/UserForm'

export default function EditUserPage() {
  const params = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit User</h1>
      <UserForm user={user} isEdit />
    </div>
  )
}
