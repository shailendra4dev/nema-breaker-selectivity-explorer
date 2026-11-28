import { z } from 'zod';

export const selectivityLookupQuerySchema = z
  .object({
    voltage: z.coerce
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
  })
  .refine(
    (data) =>
      data.upstreamBreakerId !== data.downstreamBreakerId,
    {
      message:
        'Downstream breaker must be different from upstream breaker',
      path: ['downstreamBreakerId'],
    },
  );

export const selectivityLookupRequestSchema = z.object({
  query: selectivityLookupQuerySchema,
});

export type SelectivityLookupQuery = z.infer<
  typeof selectivityLookupQuerySchema
>;