import { z } from 'zod';

export const breakerIdParamsSchema = z.object({
  id: z.string().trim().min(1, 'Breaker id is required.'),
});

export const createBreakerSchema = z.object({
  body: z.object({
    familyId: z
      .string()
      .trim()
      .min(1, 'Breaker family is required.'),

    catalogNumber: z
      .string()
      .trim()
      .min(1, 'Catalog number is required.')
      .max(50, 'Catalog number cannot exceed 50 characters.'),

    ampereRating: z
      .number()
      .positive('Ampere rating must be greater than 0.'),

    poles: z
      .number()
      .int('Poles must be a whole number.')
      .min(1, 'Poles must be at least 1.')
      .max(4, 'Poles cannot exceed 4.'),

    status: z.enum(['active', 'inactive']),
  }),
});

export const updateBreakerSchema = z.object({
  params: breakerIdParamsSchema,
  body: createBreakerSchema.shape.body,
});