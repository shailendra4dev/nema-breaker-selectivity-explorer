import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  breakerFamilySchema,
  type BreakerFamilyFormValues,
} from '../schemas/breakerFamilySchema';

interface BreakerFamilyFormProps {
  defaultValues?: BreakerFamilyFormValues;
  submitLabel: string;
  onSubmit: (values: BreakerFamilyFormValues) => void;
  onCancel: () => void;
}

const emptyValues: BreakerFamilyFormValues = {
  name: '',
  description: '',
  status: 'active',
};

const BreakerFamilyForm = ({
  defaultValues = emptyValues,
  submitLabel,
  onSubmit,
  onCancel,
}: BreakerFamilyFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BreakerFamilyFormValues>({
    resolver: zodResolver(breakerFamilySchema),
    defaultValues,
  });

  return (
    <Stack
      component="form"
      spacing={3}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Family name"
            fullWidth
            autoFocus
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            multiline
            minRows={3}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Status"
            fullWidth
            error={Boolean(errors.status)}
            helperText={errors.status?.message}
          >
            <MenuItem value="active">
              Active
            </MenuItem>

            <MenuItem value="inactive">
              Inactive
            </MenuItem>
          </TextField>
        )}
      />

      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'flex-end' }}
      >
        <Button
          type="button"
          color="inherit"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>
      </Stack>
    </Stack>
  );
};

export default BreakerFamilyForm;
