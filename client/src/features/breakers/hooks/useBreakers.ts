import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createBreaker,
  deleteBreaker,
  getBreakers,
  updateBreaker,
} from '../api/breakerApi';

import type {
  CreateBreakerRequest,
  UpdateBreakerRequest,
} from '../types/breaker.types';

export const breakerKeys = {
  all: ['breakers'] as const,

  lists: () =>
    [...breakerKeys.all, 'list'] as const,

  list: () =>
    [...breakerKeys.lists()] as const,

  details: () =>
    [...breakerKeys.all, 'detail'] as const,

  detail: (id: string) =>
    [...breakerKeys.details(), id] as const,
};

export const useBreakers = () => {
  return useQuery({
    queryKey: breakerKeys.list(),
    queryFn: getBreakers,
  });
};

export const useCreateBreaker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      input: CreateBreakerRequest,
    ) => createBreaker(input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: breakerKeys.lists(),
      });
    },
  });
};

interface UpdateBreakerVariables {
  id: string;
  input: UpdateBreakerRequest;
}

export const useUpdateBreaker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: UpdateBreakerVariables) =>
      updateBreaker(id, input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: breakerKeys.all,
      });
    },
  });
};

export const useDeleteBreaker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBreaker,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: breakerKeys.lists(),
      });
    },
  });
};