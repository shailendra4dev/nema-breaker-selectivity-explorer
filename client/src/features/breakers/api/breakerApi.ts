import { httpClient } from '../../../api/httpClient';

import type {
  ApiResponse,
  Breaker,
  CreateBreakerRequest,
  UpdateBreakerRequest,
} from '../types/breaker.types';

const BREAKERS_PATH = '/breakers';

export const getBreakers =
  async (): Promise<Breaker[]> => {
    const response =
      await httpClient<ApiResponse<Breaker[]>>(
        BREAKERS_PATH,
      );

    return response.data;
  };

export const getBreakerById =
  async (
    id: string,
  ): Promise<Breaker> => {
    const response =
      await httpClient<ApiResponse<Breaker>>(
        `${BREAKERS_PATH}/${id}`,
      );

    return response.data;
  };

export const createBreaker =
  async (
    input: CreateBreakerRequest,
  ): Promise<Breaker> => {
    const response =
      await httpClient<ApiResponse<Breaker>>(
        BREAKERS_PATH,
        {
          method: 'POST',
          body: input,
        },
      );

    return response.data;
  };

export const updateBreaker =
  async (
    id: string,
    input: UpdateBreakerRequest,
  ): Promise<Breaker> => {
    const response =
      await httpClient<ApiResponse<Breaker>>(
        `${BREAKERS_PATH}/${id}`,
        {
          method: 'PUT',
          body: input,
        },
      );

    return response.data;
  };

export const deleteBreaker =
  async (
    id: string,
  ): Promise<void> => {
    await httpClient<void>(
      `${BREAKERS_PATH}/${id}`,
      {
        method: 'DELETE',
      },
    );
  };