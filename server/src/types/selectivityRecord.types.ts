export type SelectivityRecordStatus = 'active' | 'inactive';

export interface SelectivityRecord {
  id: string;
  voltage: number;
  upstreamBreakerId: string;
  downstreamBreakerId: string;
  selectivityKa: number;
  status: SelectivityRecordStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSelectivityRecordInput {
  voltage: number;
  upstreamBreakerId: string;
  downstreamBreakerId: string;
  selectivityKa: number;
  status: SelectivityRecordStatus;
}

export type UpdateSelectivityRecordInput = Partial<CreateSelectivityRecordInput>;