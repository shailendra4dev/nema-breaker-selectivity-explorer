import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import type { Breaker } from '../../breakers/types/breaker.types';

import { useCreateSelectivityRecord } from '../hooks/useCreateSelectivityRecord';
import { useUpdateSelectivityRecord } from '../hooks/useUpdateSelectivityRecord';

import type { SelectivityRecordFormData } from '../schemas/selectivityRecordSchema';
import type { SelectivityRecord } from '../types/selectivityRecord.types';

import { SelectivityRecordForm } from './SelectivityRecordForm';

interface SelectivityRecordFormDialogProps {
  open: boolean;
  record?: SelectivityRecord;
  breakers: Breaker[];
  onClose: () => void;
}

export const SelectivityRecordFormDialog = ({
  open,
  record,
  breakers,
  onClose,
}: SelectivityRecordFormDialogProps) => {
  const createMutation =
    useCreateSelectivityRecord();

  const updateMutation =
    useUpdateSelectivityRecord();

  const isEditing = Boolean(record);

  const activeMutation = isEditing
    ? updateMutation
    : createMutation;

  const handleSubmit = async (
    data: SelectivityRecordFormData,
  ) => {
    try {
      if (record) {
        await updateMutation.mutateAsync({
          id: record.id,
          data,
        });
      } else {
        await createMutation.mutateAsync(
          data,
        );
      }

      onClose();
    } catch {
      // Error is displayed below.
    }
  };

  const mutationError =
    activeMutation.error instanceof Error
      ? activeMutation.error.message
      : undefined;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {isEditing
          ? 'Edit Selectivity Record'
          : 'Add Selectivity Record'}
      </DialogTitle>

      <DialogContent>
        <SelectivityRecordForm
          record={record}
          breakers={breakers}
          isSubmitting={
            activeMutation.isPending
          }
          error={mutationError}
          onSubmit={handleSubmit}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={activeMutation.isPending}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          form="selectivity-record-form"
          variant="contained"
          disabled={activeMutation.isPending}
        >
          {activeMutation.isPending
            ? 'Saving...'
            : isEditing
              ? 'Save Changes'
              : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};