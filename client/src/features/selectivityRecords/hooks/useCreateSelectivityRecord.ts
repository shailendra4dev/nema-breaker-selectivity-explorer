import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createSelectivityRecord } from '../api/selectivityRecordApi';
import { selectivityRecordKeys } from './useSelectivityRecords';

export const useCreateSelectivityRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSelectivityRecord,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: selectivityRecordKeys.all,
      });
    },
  });
};