import { Router } from 'express';

import {
  deleteSelectivityRecordController,
  getSelectivityRecord,
  getSelectivityRecords,
  postSelectivityRecord,
  putSelectivityRecord,
} from '../controllers/selectivityRecord.controller.js';

import {
  createSelectivityRecordSchema,
  updateSelectivityRecordSchema,
} from '../schemas/selectivityRecord.schema.js';

import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

router.get(
  '/',
  getSelectivityRecords,
);

router.get(
  '/:id',
  getSelectivityRecord,
);

router.post(
  '/',
  validateRequest(createSelectivityRecordSchema),
  postSelectivityRecord,
);

router.put(
  '/:id',
  validateRequest(updateSelectivityRecordSchema),
  putSelectivityRecord,
);

router.delete(
  '/:id',
  deleteSelectivityRecordController,
);

export const selectivityRecordRoutes = router;