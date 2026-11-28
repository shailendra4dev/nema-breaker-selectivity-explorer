import type {
  NextFunction,
  Request,
  Response,
} from 'express';

import {
  addSelectivityRecord,
  editSelectivityRecord,
  findSelectivityRecordById,
  listSelectivityRecords,
  removeSelectivityRecord,
} from '../services/selectivityRecord.service.js';

export const getSelectivityRecords = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const records = listSelectivityRecords();

    res.json({
      success: true,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export const getSelectivityRecord = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const record = findSelectivityRecordById(
      req.params.id,
    );

    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const postSelectivityRecord = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const record = addSelectivityRecord(req.body);

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const putSelectivityRecord = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const record = editSelectivityRecord(
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSelectivityRecordController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    removeSelectivityRecord(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};