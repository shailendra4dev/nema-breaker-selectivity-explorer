import { z } from 'zod';

export const breakerSchema = z.object({
  familyId: z
    .string()
    .min(1, 'Breaker family is required.'),

  catalogNumber: z
    .string()
    .trim()
    .min(1, 'Catalog number is required.')
    .max(
      50,
      'Catalog number cannot exceed 50 characters.',
    ),

  ampereRating: z
    .number({
      error: 'Ampere rating is required.',
    })
    .positive(
      'Ampere rating must be greater than 0.',
    ),

  poles: z
    .number({
      error: 'Number of poles is required.',
    })
    .int('Poles must be a whole number.')
    .min(1, 'Poles must be at least 1.')
    .max(4, 'Poles cannot exceed 4.'),

  status: z.enum([
    'active',
    'inactive',
  ]),
});

export type BreakerFormValues =
  z.infer<typeof breakerSchema>;