export type BreakerStatus = 'active' | 'inactive';

export interface Breaker {
  id: string;
  familyId: string;
  catalogNumber: string;
  ampereRating: number;
  poles: number;
  status: BreakerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBreakerInput {
  familyId: string;
  catalogNumber: string;
  ampereRating: number;
  poles: number;
  status: BreakerStatus;
}

export type UpdateBreakerInput = CreateBreakerInput;