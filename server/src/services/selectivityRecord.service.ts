import {
  createSelectivityRecord,
  deleteSelectivityRecord,
  getAllSelectivityRecords,
  getSelectivityRecordById,
  updateSelectivityRecord,
} from '../repositories/selectivityRecord.repository.js';

import { getBreakerById } from '../services/breaker.service.js';

import type {
  CreateSelectivityRecordInput,
  UpdateSelectivityRecordInput,
} from '../types/selectivityRecord.types.js';

export const listSelectivityRecords = () => {
  return getAllSelectivityRecords();
};

export const findSelectivityRecordById = (
  id: string,
) => {
  const record = getSelectivityRecordById(id);

  if (!record) {
    throw new Error('Selectivity record not found');
  }

  return record;
};

const validateBreakerRelationship = (
  input: CreateSelectivityRecordInput,
) => {
  const upstreamBreaker = getBreakerById(
    input.upstreamBreakerId,
  );

  if (!upstreamBreaker) {
    throw new Error('Upstream breaker not found');
  }

  const downstreamBreaker = getBreakerById(
    input.downstreamBreakerId,
  );

  if (!downstreamBreaker) {
    throw new Error('Downstream breaker not found');
  }

  if (
    input.upstreamBreakerId ===
    input.downstreamBreakerId
  ) {
    throw new Error(
      'Upstream and downstream breakers must be different',
    );
  }
};

export const addSelectivityRecord = (
  input: CreateSelectivityRecordInput,
) => {
  validateBreakerRelationship(input);

  return createSelectivityRecord(input);
};

export const editSelectivityRecord = (
  id: string,
  input: UpdateSelectivityRecordInput,
) => {
  const existingRecord = getSelectivityRecordById(id);

  if (!existingRecord) {
    throw new Error('Selectivity record not found');
  }

  const mergedInput: CreateSelectivityRecordInput = {
    voltage:
      input.voltage ?? existingRecord.voltage,
    upstreamBreakerId:
      input.upstreamBreakerId ??
      existingRecord.upstreamBreakerId,
    downstreamBreakerId:
      input.downstreamBreakerId ??
      existingRecord.downstreamBreakerId,
    selectivityKa:
      input.selectivityKa ??
      existingRecord.selectivityKa,
    status:
      input.status ?? existingRecord.status,
  };

  validateBreakerRelationship(mergedInput);

  return updateSelectivityRecord(id, input);
};

export const removeSelectivityRecord = (
  id: string,
) => {
  const deleted = deleteSelectivityRecord(id);

  if (!deleted) {
    throw new Error('Selectivity record not found');
  }
};