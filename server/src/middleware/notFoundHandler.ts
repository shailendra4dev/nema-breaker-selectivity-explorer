import type {
  NextFunction,
  Request,
  Response,
} from 'express';

import { AppError } from '../errors/AppError.js';

export const notFoundHandler = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  next(
    new AppError(
      `Route ${request.method} ${request.originalUrl} was not found.`,
      404,
    ),
  );
};