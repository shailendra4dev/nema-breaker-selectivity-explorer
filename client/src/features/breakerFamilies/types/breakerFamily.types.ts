export type BreakerFamilyStatus = 'active' | 'inactive';

export type BreakerFamily = {
  id: string;
  name: string;
  description: string;
  status: BreakerFamilyStatus;
};

export type CreateBreakerFamilyInput = {
  name: string;
  description: string;
  status: BreakerFamilyStatus;
};

export type UpdateBreakerFamilyInput = CreateBreakerFamilyInput;