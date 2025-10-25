/**
 * EmptyState Component
 * 
 * Displays a friendly message when no data is available.
 * Used in list views when there are no items to display.
 * 
 * Design Rationale:
 * - Better UX than showing empty tables/lists
 * - Consistent empty state UI across the app
 * - Optional action button to guide users
 * - Reusable across different contexts
 */

import { Box, Typography, Button, Paper } from '@mui/material'
import { ReactNode } from 'react'
import Link from 'next/link'

interface EmptyStateProps {
  /** Icon to display */
  icon: ReactNode
  /** Title of the empty state */
  title: string
  /** Description text */
  description?: string
  /** Optional action button */
  action?: {
    href: string
    label: string
    icon: ReactNode
  }
}

export default function EmptyState({ 
  icon, 
  title, 
  description,
  action 
}: EmptyStateProps) {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 6, 
        textAlign: 'center',
        bgcolor: 'grey.50',
        border: '2px dashed',
        borderColor: 'grey.300'
      }}
    >
      <Box sx={{ 
        color: 'text.secondary', 
        fontSize: 64,
        mb: 2,
        display: 'flex',
        justifyContent: 'center'
      }}>
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom fontWeight="600">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>
      )}
      {action && (
        <Button
          component={Link}
          href={action.href}
          variant="contained"
          startIcon={action.icon}
        >
          {action.label}
        </Button>
      )}
    </Paper>
  )
}
