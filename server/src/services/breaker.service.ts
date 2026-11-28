import { AppError } from '../errors/AppError.js';

import {
  createBreaker as createBreakerInRepository,
  deleteBreaker as deleteBreakerFromRepository,
  findAllBreakers,
  findBreakerByCatalogNumber,
  findBreakerById,
  updateBreaker as updateBreakerInRepository,
} from '../repositories/breaker.repository.js';

import { breakerFamilyRepository } from '../repositories/breakerFamily.repository.js';

import type {
  Breaker,
  CreateBreakerInput,
  UpdateBreakerInput,
} from '../types/breaker.types.js';

export const getBreakers = (): Breaker[] => {
  return findAllBreakers();
};

export const getBreakerById = (
  id: string,
): Breaker => {
  const breaker = findBreakerById(id);

  if (!breaker) {
    throw new AppError('Breaker not found.', 404);
  }

  return breaker;
};

const validateFamily = (familyId: string): void => {
  const family = breakerFamilyRepository.findById(familyId);

  if (!family) {
    throw new AppError(
      'Selected breaker family does not exist.',
      400,
    );
  }
};

export const createBreaker = (
  input: CreateBreakerInput,
): Breaker => {
  validateFamily(input.familyId);

  const existingBreaker =
    findBreakerByCatalogNumber(input.catalogNumber);

  if (existingBreaker) {
    throw new AppError(
      'A breaker with this catalog number already exists.',
      409,
    );
  }

  return createBreakerInRepository(input);
};

export const updateBreaker = (
  id: string,
  input: UpdateBreakerInput,
): Breaker => {
  const currentBreaker = getBreakerById(id);

  validateFamily(input.familyId);

  const breakerWithCatalogNumber =
    findBreakerByCatalogNumber(input.catalogNumber);

  if (
    breakerWithCatalogNumber &&
    breakerWithCatalogNumber.id !== currentBreaker.id
  ) {
    throw new AppError(
      'A breaker with this catalog number already exists.',
      409,
    );
  }

  const updatedBreaker =
    updateBreakerInRepository(id, input);

  if (!updatedBreaker) {
    throw new AppError('Breaker not found.', 404);
  }

  return updatedBreaker;
};

export const deleteBreaker = (
  id: string,
): void => {
  getBreakerById(id);

  const deleted = deleteBreakerFromRepository(id);

  if (!deleted) {
    throw new AppError('Breaker not found.', 404);
  }
};