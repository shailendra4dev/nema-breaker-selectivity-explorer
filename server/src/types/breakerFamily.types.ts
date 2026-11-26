export type BreakerFamilyStatus = 'active' | 'inactive';

export interface BreakerFamily {
  id: string;
  name: string;
  description: string;
  status: BreakerFamilyStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBreakerFamilyInput {
  name: string;
  description: string;
  status: BreakerFamilyStatus;
}

export type UpdateBreakerFamilyInput =
  CreateBreakerFamilyInput;