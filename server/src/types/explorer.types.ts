import type { SelectivityRecord } from './selectivityRecord.types.js';

export interface SelectivityLookupRequest {
  voltage: number;
  upstreamBreakerId: string;
  downstreamBreakerId: string;
}

export type SelectivityLookupResult =
  SelectivityRecord | null;