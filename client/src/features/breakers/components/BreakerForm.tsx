import { zodResolver } from '@hookform/resolvers/zod';

import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import { useBreakerFamilies } from '../../breakerFamilies/hooks/useBreakerFamilies';

import {
  breakerSchema,
  type BreakerFormValues,
} from '../schemas/breakerSchema';

import type { Breaker } from '../types/breaker.types';

interface BreakerFormProps {
  initialBreaker?: Breaker;

  onSubmit: (
    values: BreakerFormValues,
  ) => Promise<void>;

  disabled?: boolean;
}

export const BreakerForm = ({
  initialBreaker,
  onSubmit,
  disabled = false,
}: BreakerFormProps) => {
  const {
    data: breakerFamilies = [],
    isLoading: familiesLoading,
    isError: familiesError,
  } = useBreakerFamilies();

  const {
    control,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<BreakerFormValues>({
    resolver: zodResolver(breakerSchema),

    defaultValues: {
      familyId:
        initialBreaker?.familyId ?? '',

      catalogNumber:
        initialBreaker?.catalogNumber ?? '',

      ampereRating:
        initialBreaker?.ampereRating ?? 1,

      poles:
        initialBreaker?.poles ?? 3,

      status:
        initialBreaker?.status ?? 'active',
    },
  });

  if (familiesError) {
    return (
      <Alert severity="error">
        Breaker families could not be loaded.
      </Alert>
    );
  }

  return (
    <Box
      component="form"
      id="breaker-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Stack spacing={3}>
        <Controller
          name="familyId"
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={Boolean(
                errors.familyId,
              )}
            >
              <InputLabel id="breaker-family-label">
                Breaker Family
              </InputLabel>

              <Select
                {...field}
                labelId="breaker-family-label"
                label="Breaker Family"
                disabled={
                  disabled ||
                  familiesLoading
                }
              >
                {breakerFamilies
                  .filter(
                    (family) =>
                      family.status ===
                      'active',
                  )
                  .map((family) => (
                    <MenuItem
                      key={family.id}
                      value={family.id}
                    >
                      {family.name}
                    </MenuItem>
                  ))}
              </Select>

              <FormHelperText>
                {errors.familyId?.message}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="catalogNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Catalog Number"
              fullWidth
              disabled={disabled}
              error={Boolean(
                errors.catalogNumber,
              )}
              helperText={
                errors.catalogNumber
                  ?.message
              }
            />
          )}
        />

        <Controller
          name="ampereRating"
          control={control}
          render={({
            field: {
              onChange,
              ...field
            },
          }) => (
            <TextField
              {...field}
              label="Ampere Rating"
              type="number"
              fullWidth
              disabled={disabled}
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
              onChange={(event) =>
                onChange(
                  event.target
                    .value === ''
                    ? 0
                    : Number(
                        event.target
                          .value,
                      ),
                )
              }
              error={Boolean(
                errors.ampereRating,
              )}
              helperText={
                errors.ampereRating
                  ?.message
              }
            />
          )}
        />

        <Controller
          name="poles"
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={Boolean(
                errors.poles,
              )}
            >
              <InputLabel id="breaker-poles-label">
                Poles
              </InputLabel>

              <Select
                {...field}
                labelId="breaker-poles-label"
                label="Poles"
                disabled={disabled}
                onChange={(event) =>
                  field.onChange(
                    Number(
                      event.target.value,
                    ),
                  )
                }
              >
                <MenuItem value={1}>
                  1 Pole
                </MenuItem>

                <MenuItem value={2}>
                  2 Poles
                </MenuItem>

                <MenuItem value={3}>
                  3 Poles
                </MenuItem>

                <MenuItem value={4}>
                  4 Poles
                </MenuItem>
              </Select>

              <FormHelperText>
                {errors.poles?.message}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="breaker-status-label">
                Status
              </InputLabel>

              <Select
                {...field}
                labelId="breaker-status-label"
                label="Status"
                disabled={disabled}
              >
                <MenuItem value="active">
                  Active
                </MenuItem>

                <MenuItem value="inactive">
                  Inactive
                </MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Stack>
    </Box>
  );
};