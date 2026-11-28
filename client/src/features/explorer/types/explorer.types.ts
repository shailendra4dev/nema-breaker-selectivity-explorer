import type { SelectivityRecord } from '../../selectivityRecords/types/selectivityRecord.types';

export interface SelectivityLookupRequest {
  voltage: number;
  upstreamBreakerId: string;
  downstreamBreakerId: string;
}

export type SelectivityLookupResult =
  SelectivityRecord | null;