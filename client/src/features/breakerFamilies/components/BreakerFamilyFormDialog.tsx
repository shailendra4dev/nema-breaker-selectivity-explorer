import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import type { BreakerFamily } from '../types/breakerFamily.types';
import type { BreakerFamilyFormValues } from '../schemas/breakerFamilySchema';
import BreakerFamilyForm from './BreakerFamilyForm';

interface BreakerFamilyFormDialogProps {
  open: boolean;
  breakerFamily?: BreakerFamily | null;
  onClose: () => void;
  onSubmit: (values: BreakerFamilyFormValues) => void;
}

const BreakerFamilyFormDialog = ({
  open,
  breakerFamily,
  onClose,
  onSubmit,
}: BreakerFamilyFormDialogProps) => {
  const isEditing = Boolean(breakerFamily);

  const defaultValues: BreakerFamilyFormValues = breakerFamily
    ? {
        name: breakerFamily.name,
        description: breakerFamily.description,
        status: breakerFamily.status,
      }
    : {
        name: '',
        description: '',
        status: 'active',
      };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {isEditing
          ? 'Edit breaker family'
          : 'Add breaker family'}
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <BreakerFamilyForm
          key={breakerFamily?.id ?? 'new'}
          defaultValues={defaultValues}
          submitLabel={
            isEditing ? 'Save changes' : 'Add family'
          }
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BreakerFamilyFormDialog;