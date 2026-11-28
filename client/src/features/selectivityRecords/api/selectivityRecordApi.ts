import { httpClient } from '../../../api/httpClient';

import type {
  CreateSelectivityRecordRequest,
  SelectivityRecord,
  UpdateSelectivityRecordRequest,
} from '../types/selectivityRecord.types';

const SELECTIVITY_RECORDS_PATH = '/selectivity-records';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getSelectivityRecords =
  async (): Promise<SelectivityRecord[]> => {
    const response =
      await httpClient<ApiResponse<SelectivityRecord[]>>(
        SELECTIVITY_RECORDS_PATH,
      );

    return response.data;
  };

export const getSelectivityRecord = async (
  id: string,
): Promise<SelectivityRecord> => {
  const response =
    await httpClient<ApiResponse<SelectivityRecord>>(
      `${SELECTIVITY_RECORDS_PATH}/${id}`,
    );

  return response.data;
};

export const createSelectivityRecord = async (
  data: CreateSelectivityRecordRequest,
): Promise<SelectivityRecord> => {
  const response =
    await httpClient<ApiResponse<SelectivityRecord>>(
      SELECTIVITY_RECORDS_PATH,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );

  return response.data;
};

export const updateSelectivityRecord = async (
  id: string,
  data: UpdateSelectivityRecordRequest,
): Promise<SelectivityRecord> => {
  const response =
    await httpClient<ApiResponse<SelectivityRecord>>(
      `${SELECTIVITY_RECORDS_PATH}/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
    );

  return response.data;
};

export const deleteSelectivityRecord = async (
  id: string,
): Promise<void> => {
  await httpClient(
    `${SELECTIVITY_RECORDS_PATH}/${id}`,
    {
      method: 'DELETE',
    },
  );
};