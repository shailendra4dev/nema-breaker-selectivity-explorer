import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import type { ZodType } from 'zod';

import { AppError } from '../errors/AppError.js';

export const validateRequest =
  (schema: ZodType) =>
  (
    request: Request,
    _response: Response,
    next: NextFunction,
  ): void => {
    const result = schema.safeParse({
      body: request.body,
      params: request.params,
      query: request.query,
    });

    if (!result.success) {
      next(
        new AppError(
          'Request validation failed.',
          400,
          result.error.flatten(),
        ),
      );

      return;
    }

    next();
  };