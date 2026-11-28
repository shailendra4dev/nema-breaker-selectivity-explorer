import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  type SelectChangeEvent,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../app/hooks';
import type { Breaker } from '../../breakers/types/breaker.types';
import { explorerSchema } from '../schemas/explorerSchema';
import {
  setExplorerCriteria,
} from '../store/explorerSlice';
import type {
  ExplorerFormData,
} from '../schemas/explorerSchema';

interface ExplorerFormProps {
  breakers: Breaker[];
  onSubmit: (values: ExplorerFormData) => void;
  isPending?: boolean;
}

const VOLTAGE_OPTIONS = [208, 240, 480, 600];

export const ExplorerForm = ({
  breakers,
  onSubmit,
  isPending = false,
}: ExplorerFormProps) => {
  const dispatch = useAppDispatch();

  const savedCriteria = useAppSelector(
    (state) => state.explorer.criteria,
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExplorerFormData>({
    resolver: zodResolver(explorerSchema),

    defaultValues: {
      voltage: savedCriteria.voltage ?? undefined,
      upstreamBreakerId:
        savedCriteria.upstreamBreakerId,
      downstreamBreakerId:
        savedCriteria.downstreamBreakerId,
    },
  });

  const voltage = watch('voltage');
  const upstreamBreakerId =
    watch('upstreamBreakerId');
  const downstreamBreakerId =
    watch('downstreamBreakerId');

  useEffect(() => {
    dispatch(
      setExplorerCriteria({
        voltage:
          typeof voltage === 'number'
            ? voltage
            : null,

        upstreamBreakerId:
          upstreamBreakerId ?? '',

        downstreamBreakerId:
          downstreamBreakerId ?? '',
      }),
    );
  }, [
    dispatch,
    voltage,
    upstreamBreakerId,
    downstreamBreakerId,
  ]);

  const activeBreakers = breakers.filter(
    (breaker) => breaker.status === 'active',
  );

  const upstreamBreakers = activeBreakers.filter(
    (breaker) =>
      breaker.id !== downstreamBreakerId,
  );

  const downstreamBreakers = activeBreakers.filter(
    (breaker) =>
      breaker.id !== upstreamBreakerId,
  );

  const handleUpstreamChange = (
    event: SelectChangeEvent<string>,
    onChange: (value: string) => void,
  ) => {
    const value = event.target.value;

    onChange(value);

    if (value === downstreamBreakerId) {
      setValue('downstreamBreakerId', '');
    }
  };

  const handleDownstreamChange = (
    event: SelectChangeEvent<string>,
    onChange: (value: string) => void,
  ) => {
    const value = event.target.value;

    onChange(value);

    if (value === upstreamBreakerId) {
      setValue('upstreamBreakerId', '');
    }
  };

  return (
    <Stack
      component="form"
      spacing={3}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Voltage */}
      <Controller
        name="voltage"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={Boolean(errors.voltage)}
          >
            <InputLabel id="voltage-label">
              System Voltage
            </InputLabel>

            <Select
              {...field}
              value={field.value ?? ''}
              labelId="voltage-label"
              label="System Voltage"
              onChange={(event) => {
                const value = String(event.target.value);

                field.onChange(
                  value === ''
                    ? undefined
                    : Number(value),
                );
              }}
            >
              {VOLTAGE_OPTIONS.map(
                (voltageOption) => (
                  <MenuItem
                    key={voltageOption}
                    value={voltageOption}
                  >
                    {voltageOption} V
                  </MenuItem>
                ),
              )}
            </Select>

            <FormHelperText>
              {errors.voltage?.message}
            </FormHelperText>
          </FormControl>
        )}
      />

      {/* Upstream breaker */}
      <Controller
        name="upstreamBreakerId"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={Boolean(
              errors.upstreamBreakerId,
            )}
          >
            <InputLabel id="upstream-breaker-label">
              Upstream Breaker
            </InputLabel>

            <Select
              {...field}
              labelId="upstream-breaker-label"
              label="Upstream Breaker"
              value={field.value ?? ''}
              onChange={(event) =>
                handleUpstreamChange(
                  event,
                  field.onChange,
                )
              }
            >
              {upstreamBreakers.map(
                (breaker) => (
                  <MenuItem
                    key={breaker.id}
                    value={breaker.id}
                  >
                    {breaker.catalogNumber}
                  </MenuItem>
                ),
              )}
            </Select>

            <FormHelperText>
              {
                errors.upstreamBreakerId
                  ?.message
              }
            </FormHelperText>
          </FormControl>
        )}
      />

      {/* Downstream breaker */}
      <Controller
        name="downstreamBreakerId"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={Boolean(
              errors.downstreamBreakerId,
            )}
          >
            <InputLabel id="downstream-breaker-label">
              Downstream Breaker
            </InputLabel>

            <Select
              {...field}
              labelId="downstream-breaker-label"
              label="Downstream Breaker"
              value={field.value ?? ''}
              onChange={(event) =>
                handleDownstreamChange(
                  event,
                  field.onChange,
                )
              }
            >
              {downstreamBreakers.map(
                (breaker) => (
                  <MenuItem
                    key={breaker.id}
                    value={breaker.id}
                  >
                    {breaker.catalogNumber}
                  </MenuItem>
                ),
              )}
            </Select>

            <FormHelperText>
              {
                errors.downstreamBreakerId
                  ?.message
              }
            </FormHelperText>
          </FormControl>
        )}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isPending}
      >
        {isPending
          ? 'Checking...'
          : 'Check Selectivity'}
      </Button>
    </Stack>
  );
};