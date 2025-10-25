/**
 * PageHeader Component
 * 
 * Reusable component for page headers with title and optional action button.
 * Used across multiple pages (Dashboard, Users, Products) for consistent styling.
 * 
 * Design Rationale:
 * - Single responsibility: Display page title with optional action
 * - Consistent styling across the application
 * - Reduces code duplication
 * - Easy to maintain and update styling globally
 */

import { Box, Typography, Button } from '@mui/material'
import { ReactNode } from 'react'
import Link from 'next/link'

interface PageHeaderProps {
  /** Page title to display */
  title: string
  /** Optional action button configuration */
  action?: {
    /** Link href for the action button */
    href: string
    /** Button label */
    label: string
    /** Material-UI icon component */
    icon: ReactNode
  }
}

export default function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <Box className="flex justify-between items-center mb-6">
      <Typography 
        variant="h4" 
        component="h1" 
        fontWeight="bold" 
        color="text.primary"
      >
        {title}
      </Typography>
      {action && (
        <Button
          component={Link}
          href={action.href}
          variant="contained"
          startIcon={action.icon}
          size="large"
        >
          {action.label}
        </Button>
      )}
    </Box>
  )
}
