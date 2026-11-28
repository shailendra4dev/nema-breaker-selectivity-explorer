import { findActiveSelectivityRecordByCombination } from '../repositories/selectivityRecord.repository.js';
import type {
  SelectivityLookupRequest,
  SelectivityLookupResult,
} from '../types/explorer.types.js';

export const lookupSelectivity = (
  lookupRequest: SelectivityLookupRequest,
): SelectivityLookupResult => {
  const record =
    findActiveSelectivityRecordByCombination(
      lookupRequest.voltage,
      lookupRequest.upstreamBreakerId,
      lookupRequest.downstreamBreakerId,
    );

  return record ?? null;
};