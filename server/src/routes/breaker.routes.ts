import { Router } from 'express';

import {
  createBreakerController,
  deleteBreakerController,
  getBreakerByIdController,
  getBreakersController,
  updateBreakerController,
} from '../controllers/breaker.controller.js';

import { validateRequest } from '../middleware/validateRequest.js';

import {
  breakerIdParamsSchema,
  createBreakerSchema,
  updateBreakerSchema,
} from '../schemas/breaker.schema.js';

const router = Router();

router.get(
  '/',
  getBreakersController,
);

router.get(
  '/:id',
  validateRequest(breakerIdParamsSchema),
  getBreakerByIdController,
);

router.post(
  '/',
  validateRequest(createBreakerSchema),
  createBreakerController,
);

router.put(
  '/:id',
  validateRequest(updateBreakerSchema),
  updateBreakerController,
);

router.delete(
  '/:id',
  validateRequest(breakerIdParamsSchema),
  deleteBreakerController,
);

export const breakerRouter = router;