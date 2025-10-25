'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Box,
  Typography,
  CircularProgress
} from '@mui/material'
import { Edit, Delete, Add } from '@mui/icons-material'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

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
      const res = await fetch('/api/users')
      const data = await res.json()
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
      await fetch(`/api/users/${id}`, { method: 'DELETE' })
      setUsers(users.filter(u => u.id !== id))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  if (loading) {
    return (
      <Box className="flex items-center justify-center h-64">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
          {t('users.title')}
        </Typography>
        <Button
          component={Link}
          href={`/${locale}/admin/users/new`}
          variant="contained"
          startIcon={<Add />}
          size="large"
        >
          {t('users.addUser')}
        </Button>
      </Box>

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
