import { Router } from 'express';

import { getSelectivityLookup } from '../controllers/explorer.controller.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { selectivityLookupRequestSchema } from '../schemas/explorer.schema.js';

const explorerRouter = Router();

explorerRouter.get(
  '/selectivity',
  validateRequest(selectivityLookupRequestSchema),
  getSelectivityLookup,
);

export default explorerRouter;