import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { createApolloServer } from './graphql/graphql.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { apiRouter } from './routes/index.js';

export const createApp = async () => {
  const app = express();

  app.disable('x-powered-by');

  app.use(helmet());

  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
    }),
  );

  app.use(express.json({ limit: '100kb' }));

  if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.get('/', (_request, response) => {
    response.status(200).json({
      success: true,
      message:
        'NEMA Breaker Selectivity Server Route is running.',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/health', (_request, response) => {
    response.status(200).json({
      success: true,
      message:
        'NEMA Breaker Selectivity API is running.',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  });

  /*
   * REST API
   */
  app.use('/api', apiRouter);

  /*
   * GraphQL API
   */
  const apolloServer = createApolloServer();

  await apolloServer.start();

  app.use(
    '/graphql',
    expressMiddleware(apolloServer),
  );

  /*
   * These must remain after all valid routes,
   * including the GraphQL endpoint.
   */
  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
};