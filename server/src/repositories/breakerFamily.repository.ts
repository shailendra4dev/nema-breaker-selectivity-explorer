import { randomUUID } from 'node:crypto';

import { breakerFamilies } from '../data/breakerFamilies.data.js';
import type {
  BreakerFamily,
  CreateBreakerFamilyInput,
  UpdateBreakerFamilyInput,
} from '../types/breakerFamily.types.js';

const findAll = (): BreakerFamily[] => {
  return [...breakerFamilies];
};

const findById = (
  id: string,
): BreakerFamily | undefined => {
  return breakerFamilies.find(
    (family) => family.id === id,
  );
};

const findByName = (
  name: string,
): BreakerFamily | undefined => {
  const normalizedName = name.trim().toLowerCase();

  return breakerFamilies.find(
    (family) =>
      family.name.trim().toLowerCase() ===
      normalizedName,
  );
};

const create = (
  input: CreateBreakerFamilyInput,
): BreakerFamily => {
  const timestamp = new Date().toISOString();

  const family: BreakerFamily = {
    id: randomUUID(),
    ...input,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  breakerFamilies.push(family);

  return family;
};

const update = (
  id: string,
  input: UpdateBreakerFamilyInput,
): BreakerFamily | undefined => {
  const index = breakerFamilies.findIndex(
    (family) => family.id === id,
  );

  if (index === -1) {
    return undefined;
  }

  const currentFamily = breakerFamilies[index];

  if (!currentFamily) {
    return undefined;
  }

  const updatedFamily: BreakerFamily = {
    ...currentFamily,
    ...input,
    updatedAt: new Date().toISOString(),
  };

  breakerFamilies[index] = updatedFamily;

  return updatedFamily;
};

const remove = (id: string): boolean => {
  const index = breakerFamilies.findIndex(
    (family) => family.id === id,
  );

  if (index === -1) {
    return false;
  }

  breakerFamilies.splice(index, 1);

  return true;
};

export const breakerFamilyRepository = {
  findAll,
  findById,
  findByName,
  create,
  update,
  remove,
};