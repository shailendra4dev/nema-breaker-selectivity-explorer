import { app } from './app.js';
import { env } from './config/env.js';

const server = app.listen(
  env.PORT,
  '0.0.0.0',
  () => {
    console.log(
      `NEMA Breaker Selectivity API is running at http://localhost:${env.PORT}`,
    );
  },
);

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

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});