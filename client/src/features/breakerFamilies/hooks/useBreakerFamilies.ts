import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createBreakerFamily,
  deleteBreakerFamily,
  getBreakerFamilies,
  updateBreakerFamily,
} from '../api/breakerFamilyApi';
import type {
  CreateBreakerFamilyInput,
  UpdateBreakerFamilyInput,
} from '../types/breakerFamily.types';

export const breakerFamilyKeys = {
  all: ['breakerFamilies'] as const,
  lists: () => [...breakerFamilyKeys.all, 'list'] as const,
  detail: (id: string) =>
    [...breakerFamilyKeys.all, 'detail', id] as const,
};

export const useBreakerFamilies = () => {
  return useQuery({
    queryKey: breakerFamilyKeys.lists(),
    queryFn: getBreakerFamilies,
  });
};

export const useCreateBreakerFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBreakerFamilyInput) =>
      createBreakerFamily(input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: breakerFamilyKeys.lists(),
      });
    },
  });
};

export const useUpdateBreakerFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateBreakerFamilyInput;
    }) => updateBreakerFamily(id, input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: breakerFamilyKeys.lists(),
      });
    },
  });
};

export const useDeleteBreakerFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteBreakerFamily(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: breakerFamilyKeys.lists(),
      });
    },
  });
};