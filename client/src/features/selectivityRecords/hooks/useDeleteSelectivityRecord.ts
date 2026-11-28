import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deleteSelectivityRecord } from '../api/selectivityRecordApi';
import { selectivityRecordKeys } from './useSelectivityRecords';

export const useDeleteSelectivityRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSelectivityRecord,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: selectivityRecordKeys.all,
      });
    },
  });
};