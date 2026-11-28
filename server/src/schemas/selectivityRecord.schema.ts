import { z } from 'zod';

export const selectivityRecordStatusSchema = z.enum([
  'active',
  'inactive',
]);

export const createSelectivityRecordSchema = z.object({
  voltage: z
    .number()
    .positive('Voltage must be greater than 0'),

  upstreamBreakerId: z
    .string()
    .trim()
    .min(1, 'Upstream breaker is required'),

  downstreamBreakerId: z
    .string()
    .trim()
    .min(1, 'Downstream breaker is required'),

  selectivityKa: z
    .number()
    .positive('Selectivity value must be greater than 0'),

  status: selectivityRecordStatusSchema,
}).refine(
  (data) =>
    data.upstreamBreakerId !== data.downstreamBreakerId,
  {
    message:
      'Upstream and downstream breakers must be different',
    path: ['downstreamBreakerId'],
  },
);

export const updateSelectivityRecordSchema = createSelectivityRecordSchema;