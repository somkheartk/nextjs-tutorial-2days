/**
 * RecentActivities Component
 * 
 * Displays a list of recent activities in the dashboard.
 * Extracted from the main dashboard page for better organization.
 * 
 * Design Rationale:
 * - Separates concerns: Dashboard page handles layout, this component handles activity display
 * - Reusable if activities need to be shown elsewhere
 * - Easier to test independently
 * - Can be enhanced with real-time updates in the future
 */

'use client'

import { Paper, Typography, Box, Divider } from '@mui/material'
import { useTranslations } from 'next-intl'
import ActivityItem from './ActivityItem'

export interface Activity {
  id: number
  action: string
  user: string
  time: string
}

interface RecentActivitiesProps {
  /** Array of activities to display */
  activities: Activity[]
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const t = useTranslations()

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" fontWeight="600" gutterBottom>
        {t('dashboard.recentActivities')}
      </Typography>
      <Box className="space-y-3 mt-4">
        {activities.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
            {t('dashboard.noActivities')}
          </Typography>
        ) : (
          activities.map((activity, index) => (
            <Box key={activity.id}>
              <ActivityItem activity={activity} />
              {index < activities.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </Box>
    </Paper>
  )
}
