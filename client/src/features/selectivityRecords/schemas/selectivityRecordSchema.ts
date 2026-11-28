import { z } from 'zod';

export const selectivityRecordSchema = z
  .object({
    voltage: z
      .number()
      .positive('Voltage must be greater than 0'),

    upstreamBreakerId: z
      .string()
      .min(1, 'Upstream breaker is required'),

    downstreamBreakerId: z
      .string()
      .min(1, 'Downstream breaker is required'),

    selectivityKa: z
      .number()
      .positive(
        'Selectivity value must be greater than 0',
      ),

    status: z.enum([
      'active',
      'inactive',
    ]),
  })
  .refine(
    (data) =>
      data.upstreamBreakerId !==
      data.downstreamBreakerId,
    {
      message:
        'Downstream breaker must be different from upstream breaker',
      path: ['downstreamBreakerId'],
    },
  );

export type SelectivityRecordFormData =
  z.infer<typeof selectivityRecordSchema>;