import { z } from 'zod';

export const breakerFamilyBodySchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(2, 'Name must contain at least 2 characters.')
        .max(100, 'Name cannot exceed 100 characters.'),

      description: z
        .string()
        .trim()
        .max(
          500,
          'Description cannot exceed 500 characters.',
        ),

      status: z.enum(['active', 'inactive']),
    })
    .strict(),
});

export const breakerFamilyIdParamsSchema = z.object({
  params: z.object({
    id: z
      .string()
      .trim()
      .min(1, 'Breaker family ID is required.'),
  }),
});

export const breakerFamilyIdAndBodySchema =
  breakerFamilyIdParamsSchema.merge(
    breakerFamilyBodySchema,
  );

export type BreakerFamilyBody = z.infer<
  typeof breakerFamilyBodySchema
>['body'];