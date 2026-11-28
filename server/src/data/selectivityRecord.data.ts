import type { SelectivityRecord } from '../types/selectivityRecord.types.ts';

export const selectivityRecords: SelectivityRecord[] = [
  {
    id: 'sr-1',
    voltage: 480,
    upstreamBreakerId: 'br-1',
    downstreamBreakerId: 'br-2',
    selectivityKa: 35,
    status: 'active',
    createdAt: '2026-11-28T00:00:00.000Z',
    updatedAt: '2026-11-28T00:00:00.000Z',
  },
  {
    id: 'sr-2',
    voltage: 480,
    upstreamBreakerId: 'br-1',
    downstreamBreakerId: 'br-3',
    selectivityKa: 25,
    status: 'active',
    createdAt: '2026-11-28T00:00:00.000Z',
    updatedAt: '2026-11-28T00:00:00.000Z',
  },
];