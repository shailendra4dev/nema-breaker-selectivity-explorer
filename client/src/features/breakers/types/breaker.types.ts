export type BreakerStatus =
  | 'active'
  | 'inactive';

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

export interface CreateBreakerRequest {
  familyId: string;
  catalogNumber: string;
  ampereRating: number;
  poles: number;
  status: BreakerStatus;
}

export type UpdateBreakerRequest =
  CreateBreakerRequest;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}