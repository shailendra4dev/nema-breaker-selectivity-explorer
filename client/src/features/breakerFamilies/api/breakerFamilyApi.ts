import { httpClient } from '../../../api/httpClient';
import type {
  BreakerFamily,
  CreateBreakerFamilyInput,
  UpdateBreakerFamilyInput,
} from '../types/breakerFamily.types';

type BreakerFamiliesResponse = {
  data: BreakerFamily[];
};

const BREAKER_FAMILIES_PATH = '/breaker-families';

export const getBreakerFamilies = async (): Promise<BreakerFamily[]> => {
  const response =
    await httpClient<BreakerFamiliesResponse>(BREAKER_FAMILIES_PATH);

  return response.data;
};

export const getBreakerFamily = (
  id: string,
): Promise<BreakerFamily> => {
  return httpClient<BreakerFamily>(
    `${BREAKER_FAMILIES_PATH}/${id}`,
  );
};

export const createBreakerFamily = (
  input: CreateBreakerFamilyInput,
): Promise<BreakerFamily> => {
  return httpClient<BreakerFamily>(BREAKER_FAMILIES_PATH, {
    method: 'POST',
    body: input,
  });
};

export const updateBreakerFamily = (
  id: string,
  input: UpdateBreakerFamilyInput,
): Promise<BreakerFamily> => {
  return httpClient<BreakerFamily>(
    `${BREAKER_FAMILIES_PATH}/${id}`,
    {
      method: 'PUT',
      body: input,
    },
  );
};

export const deleteBreakerFamily = (
  id: string,
): Promise<void> => {
  return httpClient<void>(
    `${BREAKER_FAMILIES_PATH}/${id}`,
    {
      method: 'DELETE',
    },
  );
};