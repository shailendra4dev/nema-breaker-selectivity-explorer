import { Router } from 'express';

import { breakerFamilyRouter } from './breakerFamily.routes.js';
import { breakerRouter } from './breaker.routes.js';
import { selectivityRecordRoutes } from './selectivityRecord.routes.js';
import explorerRouter from './explorer.routes.js';

export const apiRouter = Router();

apiRouter.use(
  '/breaker-families',
  breakerFamilyRouter,
);

apiRouter.use(
  '/breakers',
  breakerRouter,
);

apiRouter.use(
  '/selectivity-records',
  selectivityRecordRoutes,
);

apiRouter.use('/explorer', explorerRouter);