import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { useDeleteSelectivityRecord } from '../hooks/useDeleteSelectivityRecord';

import type { SelectivityRecord } from '../types/selectivityRecord.types';

interface DeleteSelectivityRecordDialogProps {
  record?: SelectivityRecord;
  onClose: () => void;
}

export const DeleteSelectivityRecordDialog = ({
  record,
  onClose,
}: DeleteSelectivityRecordDialogProps) => {
  const deleteMutation =
    useDeleteSelectivityRecord();

  const handleDelete = async () => {
    if (!record) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(
        record.id,
      );

      onClose();
    } catch {
      // Error is rendered below.
    }
  };

  const errorMessage =
    deleteMutation.error instanceof Error
      ? deleteMutation.error.message
      : undefined;

  return (
    <Dialog
      open={Boolean(record)}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Selectivity Record
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete
          this selectivity record?
        </DialogContentText>

        {errorMessage && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
          >
            {errorMessage}
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={deleteMutation.isPending}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          disabled={deleteMutation.isPending}
          onClick={handleDelete}
        >
          {deleteMutation.isPending
            ? 'Deleting...'
            : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};