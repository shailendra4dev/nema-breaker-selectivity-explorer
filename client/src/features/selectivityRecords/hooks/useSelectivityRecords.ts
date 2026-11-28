import { useQuery } from '@tanstack/react-query';

import { getSelectivityRecords } from '../api/selectivityRecordApi';

export const selectivityRecordKeys = {
  all: ['selectivityRecords'] as const,
};

export const useSelectivityRecords = () => {
  return useQuery({
    queryKey: selectivityRecordKeys.all,
    queryFn: getSelectivityRecords,
  });
};
