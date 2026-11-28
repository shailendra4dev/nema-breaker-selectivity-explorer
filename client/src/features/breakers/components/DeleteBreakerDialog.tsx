import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { ApiError } from '../../../api/httpClient';

import { useDeleteBreaker } from '../hooks/useBreakers';

import type { Breaker } from '../types/breaker.types';

interface DeleteBreakerDialogProps {
  open: boolean;
  breaker?: Breaker;
  onClose: () => void;
}

export const DeleteBreakerDialog = ({
  open,
  breaker,
  onClose,
}: DeleteBreakerDialogProps) => {
  const deleteMutation =
    useDeleteBreaker();

  const handleDelete =
    async (): Promise<void> => {
      if (!breaker) {
        return;
      }

      try {
        await deleteMutation.mutateAsync(
          breaker.id,
        );

        onClose();
      } catch {
        // Mutation error displayed below.
      }
    };

  const getErrorMessage = (): string => {
    if (
      deleteMutation.error instanceof
      ApiError
    ) {
      return deleteMutation.error.message;
    }

    return 'Unable to delete the breaker.';
  };

  return (
    <Dialog
      open={open}
      onClose={
        deleteMutation.isPending
          ? undefined
          : onClose
      }
    >
      <DialogTitle>
        Delete Breaker
      </DialogTitle>

      <DialogContent>
        {deleteMutation.isError && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {getErrorMessage()}
          </Alert>
        )}

        <DialogContentText>
          Are you sure you want to delete
          {breaker
            ? ` ${breaker.catalogNumber}`
            : ' this breaker'}
          ? This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={
            deleteMutation.isPending
          }
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
          disabled={
            deleteMutation.isPending ||
            !breaker
          }
        >
          {deleteMutation.isPending
            ? 'Deleting...'
            : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};