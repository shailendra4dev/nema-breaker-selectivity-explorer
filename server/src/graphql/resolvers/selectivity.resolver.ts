import type {
  SelectivityRecord,
} from '../../types/selectivityRecord.types.js';

import {
  getBreakerById,
} from '../../services/breaker.service.js';

export const selectivityResolvers = {
  SelectivityRecord: {
    upstreamBreaker: (
      parent: SelectivityRecord,
    ) => {
      return getBreakerById(
        parent.upstreamBreakerId,
      );
    },

    downstreamBreaker: (
      parent: SelectivityRecord,
    ) => {
      return getBreakerById(
        parent.downstreamBreakerId,
      );
    },
  },
};