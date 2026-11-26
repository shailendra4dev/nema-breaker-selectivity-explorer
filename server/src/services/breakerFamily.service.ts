import { AppError } from '../errors/AppError.js';
import { breakerFamilyRepository } from '../repositories/breakerFamily.repository.js';
import type {
  BreakerFamily,
  CreateBreakerFamilyInput,
  UpdateBreakerFamilyInput,
} from '../types/breakerFamily.types.js';

const getAll = (): BreakerFamily[] => {
  return breakerFamilyRepository.findAll();
};

const getById = (id: string): BreakerFamily => {
  const family = breakerFamilyRepository.findById(id);

  if (!family) {
    throw new AppError(
      `Breaker family with ID "${id}" was not found.`,
      404,
    );
  }

  return family;
};

const create = (
  input: CreateBreakerFamilyInput,
): BreakerFamily => {
  const existingFamily =
    breakerFamilyRepository.findByName(input.name);

  if (existingFamily) {
    throw new AppError(
      `A breaker family named "${input.name}" already exists.`,
      409,
    );
  }

  return breakerFamilyRepository.create(input);
};

const update = (
  id: string,
  input: UpdateBreakerFamilyInput,
): BreakerFamily => {
  getById(id);

  const familyWithSameName =
    breakerFamilyRepository.findByName(input.name);

  if (
    familyWithSameName &&
    familyWithSameName.id !== id
  ) {
    throw new AppError(
      `A breaker family named "${input.name}" already exists.`,
      409,
    );
  }

  const updatedFamily =
    breakerFamilyRepository.update(id, input);

  if (!updatedFamily) {
    throw new AppError(
      `Breaker family with ID "${id}" was not found.`,
      404,
    );
  }

  return updatedFamily;
};

const remove = (id: string): void => {
  getById(id);

  const wasDeleted =
    breakerFamilyRepository.remove(id);

  if (!wasDeleted) {
    throw new AppError(
      `Breaker family with ID "${id}" was not found.`,
      404,
    );
  }
};

export const breakerFamilyService = {
  getAll,
  getById,
  create,
  update,
  remove,
};