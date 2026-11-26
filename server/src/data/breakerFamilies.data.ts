import type { BreakerFamily } from '../types/breakerFamily.types.js';

export const breakerFamilies: BreakerFamily[] = [
  {
    id: 'bf-1',
    name: 'PowerPact H',
    description: 'Molded case circuit breaker family.',
    status: 'active',
    createdAt: '2026-11-26T00:00:00.000Z',
    updatedAt: '2026-11-26T00:00:00.000Z',
  },
  {
    id: 'bf-2',
    name: 'PowerPact J',
    description: 'Compact molded case circuit breaker family.',
    status: 'active',
    createdAt: '2026-11-26T00:00:00.000Z',
    updatedAt: '2026-11-26T00:00:00.000Z',
  },
  {
    id: 'bf-3',
    name: 'Legacy Family',
    description: 'Example inactive breaker family.',
    status: 'inactive',
    createdAt: '2026-11-26T00:00:00.000Z',
    updatedAt: '2026-11-26T00:00:00.000Z',
  },
];