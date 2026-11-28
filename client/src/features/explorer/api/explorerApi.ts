import { httpClient } from '../../../api/httpClient';

import type {
  SelectivityLookupRequest,
  SelectivityLookupResult,
} from '../types/explorer.types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const lookupSelectivity = async (
  request: SelectivityLookupRequest,
): Promise<SelectivityLookupResult> => {
  const queryParameters = new URLSearchParams({
    voltage: String(request.voltage),
    upstreamBreakerId: request.upstreamBreakerId,
    downstreamBreakerId: request.downstreamBreakerId,
  });

  const response = await httpClient<
    ApiResponse<SelectivityLookupResult>
  >(
    `/explorer/selectivity?${queryParameters.toString()}`,
  );

  return response.data;
};