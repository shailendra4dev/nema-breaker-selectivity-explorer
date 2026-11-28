import {
  breakerResolvers,
} from './breaker.resolver.js';

import {
  queryResolvers,
} from './query.resolver.js';

import {
  selectivityResolvers,
} from './selectivity.resolver.js';

export const resolvers = {
  Query: queryResolvers,

  ...breakerResolvers,

  ...selectivityResolvers,
};