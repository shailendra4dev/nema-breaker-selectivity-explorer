import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';

import { env } from '../config/env.js';
import { AppError } from '../errors/AppError.js';

interface ErrorResponseBody {
  success: false;
  message: string;
  details?: unknown;
  stack?: string;
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  void _next;

  const isKnownError = error instanceof AppError;

  const statusCode = isKnownError
    ? error.statusCode
    : 500;

  const message = isKnownError
    ? error.message
    : 'An unexpected server error occurred.';

  const body: ErrorResponseBody = {
    success: false,
    message,
  };

  if (isKnownError && error.details !== undefined) {
    body.details = error.details;
  }

  if (
    env.NODE_ENV === 'development' &&
    error instanceof Error &&
    error.stack !== undefined
  ) {
    body.stack = error.stack;
  }

  if (!isKnownError) {
    console.error(error);
  }

  response.status(statusCode).json(body);
};