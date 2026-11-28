import { createApp } from './app.js';
import { env } from './config/env.js';

const startServer = async (): Promise<void> => {
  try {
    /*
     * createApp() is asynchronous because
     * Apollo Server must be started before
     * the Express application starts listening.
     */
    const app = await createApp();

    const server = app.listen(
      env.PORT,
      '0.0.0.0',
      () => {
        console.log(
          `NEMA Breaker Selectivity API is running at http://localhost:${env.PORT}`,
        );

        console.log(
          `GraphQL endpoint is available at http://localhost:${env.PORT}/graphql`,
        );
      },
    );

    /*
     * Graceful shutdown handler.
     */
    const shutdown = (
      signal: NodeJS.Signals,
    ): void => {
      console.log(
        `${signal} received. Closing HTTP server...`,
      );

      server.close((error) => {
        if (error) {
          console.error(
            'Failed to close the HTTP server cleanly.',
            error,
          );

          process.exit(1);
        }

        console.log('HTTP server closed.');

        process.exit(0);
      });
    };

    /*
     * Handle Ctrl+C.
     */
    process.on('SIGINT', () => {
      shutdown('SIGINT');
    });

    /*
     * Handle container/process termination.
     */
    process.on('SIGTERM', () => {
      shutdown('SIGTERM');
    });
  } catch (error) {
    console.error(
      'Failed to start the server.',
      error,
    );

    process.exit(1);
  }
};

void startServer();