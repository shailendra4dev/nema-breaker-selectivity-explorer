import { randomUUID } from 'node:crypto';

import { breakers } from '../data/breakers.data.js';

import type {
  Breaker,
  CreateBreakerInput,
  UpdateBreakerInput,
} from '../types/breaker.types.js';

export const findAllBreakers = (): Breaker[] => {
  return [...breakers];
};

export const findBreakerById = (
  id: string,
): Breaker | undefined => {
  return breakers.find((breaker) => breaker.id === id);
};

export const findBreakerByCatalogNumber = (
  catalogNumber: string,
): Breaker | undefined => {
  const normalizedCatalogNumber =
    catalogNumber.trim().toLowerCase();

  return breakers.find(
    (breaker) =>
      breaker.catalogNumber.toLowerCase() ===
      normalizedCatalogNumber,
  );
};

export const createBreaker = (
  input: CreateBreakerInput,
): Breaker => {
  const now = new Date().toISOString();

  const breaker: Breaker = {
    id: randomUUID(),
    ...input,
    catalogNumber: input.catalogNumber.trim(),
    createdAt: now,
    updatedAt: now,
  };

  breakers.push(breaker);

  return breaker;
};

export const updateBreaker = (
  id: string,
  input: UpdateBreakerInput,
): Breaker | undefined => {
  const index = breakers.findIndex(
    (breaker) => breaker.id === id,
  );

  if (index === -1) {
    return undefined;
  }

  const currentBreaker = breakers[index];

  if (!currentBreaker) {
    return undefined;
  }

  const updatedBreaker: Breaker = {
    ...currentBreaker,
    ...input,
    catalogNumber: input.catalogNumber.trim(),
    updatedAt: new Date().toISOString(),
  };

  breakers[index] = updatedBreaker;

  return updatedBreaker;
};

export const deleteBreaker = (
  id: string,
): boolean => {
  const index = breakers.findIndex(
    (breaker) => breaker.id === id,
  );

  if (index === -1) {
    return false;
  }

  breakers.splice(index, 1);

  return true;
};