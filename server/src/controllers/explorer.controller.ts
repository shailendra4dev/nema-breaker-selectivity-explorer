import type {
  NextFunction,
  Request,
  Response,
} from 'express';

import { selectivityLookupQuerySchema } from '../schemas/explorer.schema.js';
import { lookupSelectivity } from '../services/explorer.service.js';

export const getSelectivityLookup = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const query =
      selectivityLookupQuerySchema.parse(req.query);

    const result = lookupSelectivity(query);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};