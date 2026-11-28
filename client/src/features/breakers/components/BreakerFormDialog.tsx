import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { ApiError } from '../../../api/httpClient';

import type { BreakerFormValues } from '../schemas/breakerSchema';

import type { Breaker } from '../types/breaker.types';

import {
  useCreateBreaker,
  useUpdateBreaker,
} from '../hooks/useBreakers';

import { BreakerForm } from './BreakerForm';

interface BreakerFormDialogProps {
  open: boolean;
  breaker?: Breaker;
  onClose: () => void;
}

export const BreakerFormDialog = ({
  open,
  breaker,
  onClose,
}: BreakerFormDialogProps) => {
  const createMutation =
    useCreateBreaker();

  const updateMutation =
    useUpdateBreaker();

  const isEditing = Boolean(breaker);

  const activeMutation =
    isEditing
      ? updateMutation
      : createMutation;

  const handleSubmit = async (
    values: BreakerFormValues,
  ): Promise<void> => {
    try {
      if (breaker) {
        await updateMutation.mutateAsync({
          id: breaker.id,
          input: values,
        });
      } else {
        await createMutation.mutateAsync(
          values,
        );
      }

      onClose();
    } catch {
      // Mutation error is displayed below.
    }
  };

  const getErrorMessage = (): string => {
    if (
      activeMutation.error instanceof
      ApiError
    ) {
      return activeMutation.error.message;
    }

    return 'Unable to save the breaker.';
  };

  return (
    <Dialog
      open={open}
      onClose={
        activeMutation.isPending
          ? undefined
          : onClose
      }
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {isEditing
          ? 'Edit Breaker'
          : 'Add Breaker'}
      </DialogTitle>

      <DialogContent>
        {activeMutation.isError && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {getErrorMessage()}
          </Alert>
        )}

        <BreakerForm
          initialBreaker={breaker}
          onSubmit={handleSubmit}
          disabled={
            activeMutation.isPending
          }
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={
            activeMutation.isPending
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          form="breaker-form"
          variant="contained"
          disabled={
            activeMutation.isPending
          }
        >
          {activeMutation.isPending
            ? 'Saving...'
            : isEditing
              ? 'Save Changes'
              : 'Add Breaker'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};