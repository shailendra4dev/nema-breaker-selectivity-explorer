import type {
  NextFunction,
  Request,
  Response,
} from 'express';

import type { BreakerFamilyBody } from '../schemas/breakerFamily.schema.js';
import { breakerFamilyService } from '../services/breakerFamily.service.js';

type BreakerFamilyParams = {
  id: string;
};

export const getBreakerFamilies = (
  _request: Request,
  response: Response,
): void => {
  const families = breakerFamilyService.getAll();

  response.status(200).json({
    success: true,
    data: families,
  });
};

export const getBreakerFamilyById = (
  request: Request<BreakerFamilyParams>,
  response: Response,
  next: NextFunction,
): void => {
  try {
    const family = breakerFamilyService.getById(
      request.params.id,
    );

    response.status(200).json({
      success: true,
      data: family,
    });
  } catch (error) {
    next(error);
  }
};

export const createBreakerFamily = (
  request: Request<
    Record<string, never>,
    unknown,
    BreakerFamilyBody
  >,
  response: Response,
  next: NextFunction,
): void => {
  try {
    const family = breakerFamilyService.create(
      request.body,
    );

    response.status(201).json({
      success: true,
      message: 'Breaker family created successfully.',
      data: family,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBreakerFamily = (
  request: Request<
    BreakerFamilyParams,
    unknown,
    BreakerFamilyBody
  >,
  response: Response,
  next: NextFunction,
): void => {
  try {
    const family = breakerFamilyService.update(
      request.params.id,
      request.body,
    );

    response.status(200).json({
      success: true,
      message: 'Breaker family updated successfully.',
      data: family,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBreakerFamily = (
  request: Request<BreakerFamilyParams>,
  response: Response,
  next: NextFunction,
): void => {
  try {
    breakerFamilyService.remove(
      request.params.id,
    );

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};