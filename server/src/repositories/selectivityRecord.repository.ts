import { selectivityRecords } from '../data/selectivityRecord.data.js'
import type {
  CreateSelectivityRecordInput,
  SelectivityRecord,
  UpdateSelectivityRecordInput,
} from '../types/selectivityRecord.types.ts';

export const getAllSelectivityRecords =
  (): SelectivityRecord[] => {
    return selectivityRecords;
  };

export const getSelectivityRecordById = (
  id: string,
): SelectivityRecord | undefined => {
  return selectivityRecords.find(
    (record: SelectivityRecord) => record.id === id,
  );
};

export const createSelectivityRecord = (
  input: CreateSelectivityRecordInput,
): SelectivityRecord => {
  const now = new Date().toISOString();

  const newRecord: SelectivityRecord = {
    id: `sr-${crypto.randomUUID()}`,
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  selectivityRecords.push(newRecord);

  return newRecord;
};

export const updateSelectivityRecord = (
  id: string,
  input: UpdateSelectivityRecordInput,
): SelectivityRecord | undefined => {
  const index = selectivityRecords.findIndex(
    (record: SelectivityRecord) => record.id === id,
  );

  if (index === -1) {
    return undefined;
  }

  const existingRecord = selectivityRecords[index];

  if (!existingRecord) {
    return undefined;
  }

  const updatedRecord: SelectivityRecord = {
    ...existingRecord,
    ...input,
    id: existingRecord.id,
    createdAt: existingRecord.createdAt,
    updatedAt: new Date().toISOString(),
  };

  selectivityRecords[index] = updatedRecord;

  return updatedRecord;
};

export const deleteSelectivityRecord = (
  id: string,
): boolean => {
  const index = selectivityRecords.findIndex(
    (record: SelectivityRecord) => record.id === id,
  );

  if (index === -1) {
    return false;
  }

  selectivityRecords.splice(index, 1);

  return true;
};

export const findActiveSelectivityRecordByCombination = (
  voltage: number,
  upstreamBreakerId: string,
  downstreamBreakerId: string,
) => {
  return selectivityRecords.find(
    (record) =>
      record.voltage === voltage &&
      record.upstreamBreakerId === upstreamBreakerId &&
      record.downstreamBreakerId === downstreamBreakerId &&
      record.status === 'active',
  );
};