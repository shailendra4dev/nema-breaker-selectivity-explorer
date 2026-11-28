import { useMutation } from '@tanstack/react-query';

import { lookupSelectivity } from '../api/explorerApi';

export const useSelectivityLookup = () => {
  return useMutation({
    mutationFn: lookupSelectivity,
  });
};