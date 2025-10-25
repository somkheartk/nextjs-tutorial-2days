/**
 * ConfirmDialog Component
 * 
 * Reusable confirmation dialog for destructive actions.
 * Provides a consistent way to ask for user confirmation.
 * 
 * Design Rationale:
 * - Prevents accidental data loss
 * - Consistent confirmation UX
 * - Customizable title and message
 * - Reduces code duplication across delete actions
 */

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'
import { Warning } from '@mui/icons-material'
import { Box } from '@mui/material'

interface ConfirmDialogProps {
  /** Dialog open state */
  open: boolean
  /** Title of the dialog */
  title: string
  /** Message to display */
  message: string
  /** Confirm button label */
  confirmLabel?: string
  /** Cancel button label */
  cancelLabel?: string
  /** Callback when confirmed */
  onConfirm: () => void
  /** Callback when cancelled */
  onCancel: () => void
  /** Loading state during action */
  loading?: boolean
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  loading = false
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <Box className="flex items-center gap-2">
          <Warning color="warning" />
          {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onCancel} 
          disabled={loading}
          variant="outlined"
        >
          {cancelLabel}
        </Button>
        <Button 
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color="error"
          autoFocus
        >
          {loading ? 'Processing...' : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
