import type { SelectivityRecord } from '../../selectivityRecords/types/selectivityRecord.types';

export interface SelectivityLookupRequest {
  voltage: number;
  upstreamBreakerId: string;
  downstreamBreakerId: string;
}

export type SelectivityLookupResult =
  SelectivityRecord | null;

export interface ExplorerLookupRequest {
  voltage: number;
  upstreamBreakerId: string;
  downstreamBreakerId: string;
}

export interface ExplorerLookupResult {
  id: string;
  voltage: number;
  upstreamBreakerId: string;
  downstreamBreakerId: string;
  selectivityKa: number;
}

export interface ExplorerCriteria {
  voltage: number | null;
  upstreamBreakerId: string;
  downstreamBreakerId: string;
}

export interface RecentExplorerSearch {
  id: string;
  voltage: number;
  upstreamBreakerId: string;
  downstreamBreakerId: string;
  selectivityKa: number;
  searchedAt: string;
}