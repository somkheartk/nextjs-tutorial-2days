'use client'

import StatsCard from '@/components/admin/StatsCard'
import { useTranslations } from 'next-intl'
import { Paper, Typography, Box, Divider } from '@mui/material'
import { People, Inventory, ShoppingCart, AttachMoney } from '@mui/icons-material'

export default function DashboardPage() {
  const t = useTranslations()

  const stats = [
    { title: t('dashboard.totalUsers'), value: '1,234', icon: People, change: '+12%', color: 'primary' as const },
    { title: t('dashboard.totalProducts'), value: '567', icon: Inventory, change: '+8%', color: 'secondary' as const },
    { title: t('dashboard.activeUsers'), value: '891', icon: ShoppingCart, change: '+23%', color: 'success' as const },
    { title: t('dashboard.lowStock'), value: '23', icon: AttachMoney, change: '-5%', color: 'warning' as const },
  ]

  const recentActivities = [
    { id: 1, action: 'New user registered', user: 'John Doe', time: '5 minutes ago' },
    { id: 2, action: 'Product updated', user: 'Admin', time: '10 minutes ago' },
    { id: 3, action: 'Order placed', user: 'Jane Smith', time: '15 minutes ago' },
    { id: 4, action: 'User deleted', user: 'Admin', time: '30 minutes ago' },
  ]

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="text.primary">
        {t('dashboard.title')}
      </Typography>
      
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" fontWeight="600" gutterBottom>
          Recent Activities
        </Typography>
        <Box className="space-y-3 mt-4">
          {recentActivities.map((activity, index) => (
            <Box key={activity.id}>
              <Box className="flex items-center justify-between py-2">
                <Box>
                  <Typography variant="body1" fontWeight="500">
                    {activity.action}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {activity.user}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {activity.time}
                </Typography>
              </Box>
              {index < recentActivities.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}
