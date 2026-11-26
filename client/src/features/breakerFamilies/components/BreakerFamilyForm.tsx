import { zodResolver } from '@hookform/resolvers/zod';
import {
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  breakerFamilySchema,
  type BreakerFamilyFormValues,
} from '../schemas/breakerFamilySchema';

type BreakerFamilyFormProps = {
  defaultValues: BreakerFamilyFormValues;
  disabled?: boolean;
  onSubmit: (
    values: BreakerFamilyFormValues,
  ) => Promise<void>;
};

const BreakerFamilyForm = ({
  defaultValues,
  disabled = false,
  onSubmit,
}: BreakerFamilyFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BreakerFamilyFormValues>({
    resolver: zodResolver(breakerFamilySchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Stack
      id="breaker-family-form"
      component="form"
      spacing={2}
      sx={{ pt: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Name"
        fullWidth
        disabled={disabled}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        {...register('name')}
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        minRows={3}
        disabled={disabled}
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
        {...register('description')}
      />

      <TextField
        select
        label="Status"
        fullWidth
        disabled={disabled}
        error={Boolean(errors.status)}
        helperText={errors.status?.message}
        {...register('status')}
      >
        <MenuItem value="active">
          Active
        </MenuItem>

        <MenuItem value="inactive">
          Inactive
        </MenuItem>
      </TextField>
    </Stack>
  );
};

export default BreakerFamilyForm;