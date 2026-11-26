import { Router } from 'express';

import {
  createBreakerFamily,
  deleteBreakerFamily,
  getBreakerFamilies,
  getBreakerFamilyById,
  updateBreakerFamily,
} from '../controllers/breakerFamily.controller.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  breakerFamilyBodySchema,
  breakerFamilyIdAndBodySchema,
  breakerFamilyIdParamsSchema,
} from '../schemas/breakerFamily.schema.js';

export const breakerFamilyRouter = Router();

breakerFamilyRouter.get(
  '/',
  getBreakerFamilies,
);

breakerFamilyRouter.get(
  '/:id',
  validateRequest(breakerFamilyIdParamsSchema),
  getBreakerFamilyById,
);

breakerFamilyRouter.post(
  '/',
  validateRequest(breakerFamilyBodySchema),
  createBreakerFamily,
);

breakerFamilyRouter.put(
  '/:id',
  validateRequest(breakerFamilyIdAndBodySchema),
  updateBreakerFamily,
);

breakerFamilyRouter.delete(
  '/:id',
  validateRequest(breakerFamilyIdParamsSchema),
  deleteBreakerFamily,
);