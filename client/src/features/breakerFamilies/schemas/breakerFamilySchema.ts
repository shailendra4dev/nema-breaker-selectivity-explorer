import { z } from 'zod';

export const breakerFamilySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must contain at least 2 characters.')
    .max(100, 'Name cannot exceed 100 characters.'),

  description: z
    .string()
    .trim()
    .max(500, 'Description cannot exceed 500 characters.'),

  status: z.enum(['active', 'inactive']),
});

export type BreakerFamilyFormValues = z.infer<
  typeof breakerFamilySchema
>;