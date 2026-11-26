import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import type { BreakerFamily } from '../types/breakerFamily.types';

type DeleteBreakerFamilyDialogProps = {
  open: boolean;
  breakerFamily: BreakerFamily | null;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

const DeleteBreakerFamilyDialog = ({
  open,
  breakerFamily,
  isDeleting = false,
  onClose,
  onConfirm,
}: DeleteBreakerFamilyDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
    >
      <DialogTitle>
        Delete Breaker Family
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{' '}
          <strong>
            {breakerFamily?.name}
          </strong>
          ? This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={() => void onConfirm()}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBreakerFamilyDialog;