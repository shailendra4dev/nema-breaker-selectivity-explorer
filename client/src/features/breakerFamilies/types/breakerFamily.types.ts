export type BreakerFamilyStatus = 'active' | 'inactive';

export interface BreakerFamily {
  id: string;
  name: string;
  description: string;
  status: BreakerFamilyStatus;
}