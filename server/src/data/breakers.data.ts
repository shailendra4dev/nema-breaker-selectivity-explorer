import type { Breaker } from '../types/breaker.types.js';

export const breakers: Breaker[] = [
  {
    id: 'br-1',
    familyId: 'bf-1',
    catalogNumber: 'HGA36100',
    ampereRating: 100,
    poles: 3,
    status: 'active',
    createdAt: '2026-11-26T00:00:00.000Z',
    updatedAt: '2026-11-26T00:00:00.000Z',
  },
  {
    id: 'br-2',
    familyId: 'bf-1',
    catalogNumber: 'HGA36150',
    ampereRating: 150,
    poles: 3,
    status: 'active',
    createdAt: '2026-11-26T00:00:00.000Z',
    updatedAt: '2026-11-26T00:00:00.000Z',
  },
  {
    id: 'br-3',
    familyId: 'bf-1',
    catalogNumber: 'HJA36250',
    ampereRating: 250,
    poles: 3,
    status: 'active',
    createdAt: '2026-11-26T00:00:00.000Z',
    updatedAt: '2026-11-26T00:00:00.000Z',
  },
];