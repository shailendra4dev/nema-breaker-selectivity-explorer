import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import BreakerFamilyForm from './BreakerFamilyForm';
import type { BreakerFamilyFormValues } from '../schemas/breakerFamilySchema';
import type { BreakerFamily } from '../types/breakerFamily.types';

type BreakerFamilyFormDialogProps = {
  open: boolean;
  mode: 'create' | 'edit';
  breakerFamily?: BreakerFamily | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (
    values: BreakerFamilyFormValues,
  ) => Promise<void>;
};

const BreakerFamilyFormDialog = ({
  open,
  mode,
  breakerFamily,
  isSubmitting = false,
  onClose,
  onSubmit,
}: BreakerFamilyFormDialogProps) => {
  const title =
    mode === 'create'
      ? 'Add Breaker Family'
      : 'Edit Breaker Family';

  const defaultValues: BreakerFamilyFormValues = {
    name: breakerFamily?.name ?? '',
    description: breakerFamily?.description ?? '',
    status: breakerFamily?.status ?? 'active',
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <BreakerFamilyForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          disabled={isSubmitting}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          form="breaker-family-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Saving...'
            : mode === 'create'
              ? 'Create'
              : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BreakerFamilyFormDialog;