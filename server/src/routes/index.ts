import { Router } from 'express';

import { breakerFamilyRouter } from './breakerFamily.routes.js';

export const apiRouter = Router();

apiRouter.use(
  '/breaker-families',
  breakerFamilyRouter,
);