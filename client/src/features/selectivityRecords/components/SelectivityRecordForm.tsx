import { zodResolver } from '@hookform/resolvers/zod';

import {
  Alert,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import { useEffect } from 'react';

import type { Breaker } from '../../breakers/types/breaker.types';

import {
  selectivityRecordSchema,
  type SelectivityRecordFormData,
} from '../schemas/selectivityRecordSchema';

import type { SelectivityRecord } from '../types/selectivityRecord.types';

interface SelectivityRecordFormProps {
  record?: SelectivityRecord;
  breakers: Breaker[];
  isSubmitting: boolean;
  error?: string;
  onSubmit: (
    data: SelectivityRecordFormData,
  ) => void;
}

const defaultValues: SelectivityRecordFormData = {
  voltage: 480,
  upstreamBreakerId: '',
  downstreamBreakerId: '',
  selectivityKa: 1,
  status: 'active',
};

export const SelectivityRecordForm = ({
  record,
  breakers,
  isSubmitting,
  error,
  onSubmit,
}: SelectivityRecordFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
  } = useForm<SelectivityRecordFormData>({
    resolver: zodResolver(
      selectivityRecordSchema,
    ),
    defaultValues,
  });

  const upstreamBreakerId = watch(
    'upstreamBreakerId',
  );

  useEffect(() => {
    if (record) {
      reset({
        voltage: record.voltage,
        upstreamBreakerId:
          record.upstreamBreakerId,
        downstreamBreakerId:
          record.downstreamBreakerId,
        selectivityKa:
          record.selectivityKa,
        status: record.status,
      });
    } else {
      reset(defaultValues);
    }
  }, [record, reset]);

  return (
    <Stack
      id="selectivity-record-form"
      component="form"
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <Controller
        name="voltage"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            fullWidth
            label="System Voltage"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message
            }
            onChange={(event) =>
              field.onChange(
                Number(event.target.value),
              )
            }
          >
            <MenuItem value={208}>
              208 V
            </MenuItem>

            <MenuItem value={240}>
              240 V
            </MenuItem>

            <MenuItem value={480}>
              480 V
            </MenuItem>

            <MenuItem value={600}>
              600 V
            </MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="upstreamBreakerId"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            fullWidth
            label="Upstream Breaker"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message
            }
          >
            {breakers.map((breaker) => (
              <MenuItem
                key={breaker.id}
                value={breaker.id}
              >
                {breaker.catalogNumber}
                {' - '}
                {breaker.ampereRating} A
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="downstreamBreakerId"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            fullWidth
            label="Downstream Breaker"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message
            }
          >
            {breakers.map((breaker) => (
              <MenuItem
                key={breaker.id}
                value={breaker.id}
                disabled={
                  breaker.id ===
                  upstreamBreakerId
                }
              >
                {breaker.catalogNumber}
                {' - '}
                {breaker.ampereRating} A
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="selectivityKa"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            type="number"
            label="Selectivity (kA)"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message
            }
            onChange={(event) =>
              field.onChange(
                Number(event.target.value),
              )
            }
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            fullWidth
            label="Status"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message
            }
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

      <button
        type="submit"
        hidden
        disabled={isSubmitting}
      />
    </Stack>
  );
};