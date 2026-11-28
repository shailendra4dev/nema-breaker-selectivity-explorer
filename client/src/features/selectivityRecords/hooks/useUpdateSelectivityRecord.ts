import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateSelectivityRecord } from '../api/selectivityRecordApi';
import type { UpdateSelectivityRecordRequest } from '../types/selectivityRecord.types';
import { selectivityRecordKeys } from './useSelectivityRecords';

interface UpdateVariables {
  id: string;
  data: UpdateSelectivityRecordRequest;
}

export const useUpdateSelectivityRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdateVariables) =>
      updateSelectivityRecord(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: selectivityRecordKeys.all,
      });
    },
  });
};