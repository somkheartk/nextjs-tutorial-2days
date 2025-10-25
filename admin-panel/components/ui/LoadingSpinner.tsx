/**
 * LoadingSpinner Component
 * 
 * Reusable loading spinner component with consistent styling.
 * Used across pages when data is being fetched.
 * 
 * Design Rationale:
 * - Centralized loading UI for consistency
 * - Customizable size and message
 * - Reduces code duplication
 * - Easy to update loading behavior globally
 */

import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingSpinnerProps {
  /** Loading message to display (optional) */
  message?: string
  /** Size of the loading spinner */
  size?: number
  /** Full height of viewport */
  fullHeight?: boolean
}

export default function LoadingSpinner({ 
  message, 
  size = 40,
  fullHeight = false 
}: LoadingSpinnerProps) {
  return (
    <Box 
      className={`flex flex-col items-center justify-center gap-4 ${
        fullHeight ? 'h-screen' : 'h-64'
      }`}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  )
}
