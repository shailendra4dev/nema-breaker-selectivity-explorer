import type {
  Breaker,
} from '../../types/breaker.types.js';

import type {
  BreakerFamily,
} from '../../types/breakerFamily.types.js';

import {
  breakerFamilyService,
} from '../../services/breakerFamily.service.js';

import {
  getBreakers,
} from '../../services/breaker.service.js';

export const breakerResolvers = {
  Breaker: {
    family: (
      parent: Breaker,
    ) => {
      return breakerFamilyService.getById(
        parent.familyId,
      );
    },
  },

  BreakerFamily: {
    breakers: (
      parent: BreakerFamily,
    ) => {
      const breakers =
        getBreakers();

      return breakers.filter(
        (breaker) =>
          breaker.familyId === parent.id,
      );
    },
  },
};