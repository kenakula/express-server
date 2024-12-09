import 'reflect-metadata';

import { AppServer } from '@app/app-server';
import { DatabaseConfig } from '@config/database.config';
import { config } from 'dotenv';

config();

const startServer = async (): Promise<void> => {
  const app = new AppServer();
  const logger = app.logger;

  try {
    await DatabaseConfig.initialize();
    logger.info('Database Started');
    app.listen();
  } catch (error) {
    logger.error(error);
  }

  process.on('uncaughtException', (error) => {
    logger.error(error);
  });
};

startServer();
