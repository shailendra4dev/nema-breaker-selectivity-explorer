import {
  ApolloServer,
} from '@apollo/server';

import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/index.js';

export const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
};