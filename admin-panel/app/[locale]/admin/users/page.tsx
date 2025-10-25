'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import PageHeader from '@/components/ui/PageHeader'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Box,
  Typography
} from '@mui/material'
import { Edit, Delete, Add } from '@mui/icons-material'
import { getUsers, deleteUser, User } from '@/lib/api-service'

export default function UsersPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // Using external API service instead of Next.js internal API
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t('common.confirmDelete', { item: t('users.title').toLowerCase() }))) return

    try {
      // Using external API service instead of Next.js internal API
      await deleteUser(id)
      setUsers(users.filter(u => u.id !== id))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Box>
      <PageHeader 
        title={t('users.title')}
        action={{
          href: `/${locale}/admin/users/new`,
          label: t('users.addUser'),
          icon: <Add />
        }}
      />

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="600">
                  {t('users.name')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="600">
                  {t('users.email')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="600">
                  {t('users.role')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="600">
                  {t('users.status')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="600">
                  {t('common.actions')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user.id} 
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography fontWeight="500">{user.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary">{user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={t(`users.roles.${user.role}`)}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={t(`common.${user.status}`)}
                    color={user.status === 'active' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box className="flex gap-2">
                    <IconButton
                      component={Link}
                      href={`/${locale}/admin/users/${user.id}/edit`}
                      color="primary"
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(user.id)}
                      color="error"
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
