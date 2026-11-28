import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import type { Breaker } from '../../breakers/types/breaker.types';
import {
  explorerSchema,
  type ExplorerFormData,
} from '../schemas/explorerSchema';

interface ExplorerFormProps {
  breakers: Breaker[];
  onSubmit: (data: ExplorerFormData) => void;
  isLoading?: boolean;
}

export const ExplorerForm = ({
  breakers,
  onSubmit,
  isLoading = false,
}: ExplorerFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExplorerFormData>({
    resolver: zodResolver(explorerSchema),
    defaultValues: {
      voltage: 480,
      upstreamBreakerId: '',
      downstreamBreakerId: '',
    },
  });

  const selectedUpstreamBreakerId = watch(
    'upstreamBreakerId',
  );

  return (
    <Stack
      component="form"
      spacing={3}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Voltage"
        type="number"
        {...register('voltage', {
          valueAsNumber: true,
        })}
        error={Boolean(errors.voltage)}
        helperText={errors.voltage?.message}
        slotProps={{
          htmlInput: {
          min: 1,
          },
        }}
        fullWidth
      />

      <Controller
        name="upstreamBreakerId"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={Boolean(errors.upstreamBreakerId)}
          >
            <InputLabel id="upstream-breaker-label">
              Upstream Breaker
            </InputLabel>

            <Select
              {...field}
              labelId="upstream-breaker-label"
              label="Upstream Breaker"
            >
              {breakers.map((breaker) => (
                <MenuItem
                  key={breaker.id}
                  value={breaker.id}
                >
                  {breaker.catalogNumber}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>
              {errors.upstreamBreakerId?.message}
            </FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="downstreamBreakerId"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={Boolean(errors.downstreamBreakerId)}
          >
            <InputLabel id="downstream-breaker-label">
              Downstream Breaker
            </InputLabel>

            <Select
              {...field}
              labelId="downstream-breaker-label"
              label="Downstream Breaker"
            >
              {breakers.map((breaker) => (
                <MenuItem
                  key={breaker.id}
                  value={breaker.id}
                  disabled={
                    breaker.id ===
                    selectedUpstreamBreakerId
                  }
                >
                  {breaker.catalogNumber}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>
              {errors.downstreamBreakerId?.message}
            </FormHelperText>
          </FormControl>
        )}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading || breakers.length === 0}
      >
        {isLoading
          ? 'Checking...'
          : 'Check Selectivity'}
      </Button>
    </Stack>
  );
};