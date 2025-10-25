/**
 * ActivityItem Component
 * 
 * Displays a single activity item with action, user, and timestamp.
 * Used within RecentActivities component.
 * 
 * Design Rationale:
 * - Single responsibility: Display one activity
 * - Can be styled independently
 * - Easy to add features (icons, colors, click handlers)
 * - Follows atomic design principles
 */

'use client'

import { Box, Typography } from '@mui/material'
import { Activity } from './RecentActivities'

interface ActivityItemProps {
  /** Activity data to display */
  activity: Activity
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  return (
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
  )
}
