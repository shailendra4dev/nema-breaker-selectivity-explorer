import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import type { BreakerFamily } from '../types/breakerFamily.types';

interface DeleteBreakerFamilyDialogProps {
  open: boolean;
  breakerFamily: BreakerFamily | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteBreakerFamilyDialog = ({
  open,
  breakerFamily,
  onClose,
  onConfirm,
}: DeleteBreakerFamilyDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete breaker family?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {breakerFamily
            ? `Are you sure you want to delete "${breakerFamily.name}"? This action cannot be undone.`
            : 'Are you sure you want to delete this breaker family?'}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          color="inherit"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBreakerFamilyDialog;
