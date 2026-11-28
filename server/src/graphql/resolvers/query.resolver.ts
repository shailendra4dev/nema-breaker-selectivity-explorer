import {
  breakerFamilyService
} from '../../services/breakerFamily.service.js';

import {
  getBreakers,
  getBreakerById,
} from '../../services/breaker.service.js';

import {
  listSelectivityRecords,
} from '../../services/selectivityRecord.service.js';

import {
  findActiveSelectivityRecordByCombination,
} from '../../repositories/selectivityRecord.repository.js';

interface IdArgs {
  id: string;
}

interface SelectivityLookupArgs {
  voltage: number;
  upstreamBreakerId: string;
  downstreamBreakerId: string;
}

export const queryResolvers = {
  breakerFamilies: () => {
    return breakerFamilyService.getAll();
  },

  breakerFamily: (
    _parent: unknown,
    args: IdArgs,
  ) => {
    return breakerFamilyService.getById(args.id);
  },

  breakers: () => {
    return getBreakers();
  },

  breaker: (
    _parent: unknown,
    args: IdArgs,
  ) => {
    return getBreakerById(args.id);
  },

  selectivityRecords: () => {
    return listSelectivityRecords();
  },

  selectivityLookup: (
    _parent: unknown,
    args: SelectivityLookupArgs,
  ) => {
    const record = findActiveSelectivityRecordByCombination(
      args.voltage,
      args.upstreamBreakerId,
      args.downstreamBreakerId,
    );

    if (!record) {
      return null;
    }

    const upstreamBreaker =
      getBreakerById(
        args.upstreamBreakerId,
      );

    const downstreamBreaker =
      getBreakerById(
        args.downstreamBreakerId,
      );

    if (
      !upstreamBreaker ||
      !downstreamBreaker
    ) {
      return null;
    }

    return {
      voltage: record.voltage,
      selectivityKa:
        record.selectivityKa,
      upstreamBreaker,
      downstreamBreaker,
    };
  },
};