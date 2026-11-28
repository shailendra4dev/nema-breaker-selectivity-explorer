import type {
  Request,
  Response,
} from 'express';

import {
  createBreaker,
  deleteBreaker,
  getBreakerById,
  getBreakers,
  updateBreaker,
} from '../services/breaker.service.js';

import type {
  CreateBreakerInput,
  UpdateBreakerInput,
} from '../types/breaker.types.js';

export const getBreakersController = (
  _request: Request,
  response: Response,
): void => {
  const breakers = getBreakers();

  response.status(200).json({
    success: true,
    data: breakers,
  });
};

export const getBreakerByIdController = (
  request: Request,
  response: Response,
): void => {
  const { id } = request.params;

  if (typeof id !== 'string') {
    response.status(400).json({
      success: false,
      message: 'A valid breaker ID is required.',
    });
    return;
  }

  const breaker = getBreakerById(id);

  response.status(200).json({
    success: true,
    data: breaker,
  });
};

export const createBreakerController = (
  request: Request,
  response: Response,
): void => {
  const breaker = createBreaker(
    request.body as CreateBreakerInput,
  );

  response.status(201).json({
    success: true,
    data: breaker,
  });
};

export const updateBreakerController = (
  request: Request,
  response: Response,
): void => {
  const { id } = request.params;

  if (typeof id !== 'string') {
    response.status(400).json({
      success: false,
      message: 'A valid breaker ID is required.',
    });
    return;
  }

  const breaker = updateBreaker(
    id,
    request.body as UpdateBreakerInput,
  );

  response.status(200).json({
    success: true,
    data: breaker,
  });
};

export const deleteBreakerController = (
  request: Request,
  response: Response,
): void => {
  const { id } = request.params;

  if (typeof id !== 'string') {
    response.status(400).json({
      success: false,
      message: 'A valid breaker ID is required.',
    });
    return;
  }

  deleteBreaker(id);

  response.status(204).send();
};