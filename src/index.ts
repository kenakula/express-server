import 'reflect-metadata';

import { AppConfig } from '@config/app.config';
import { DatabaseConfig } from '@config/database.config';
import { config } from 'dotenv';

config();

const startServer = async (): Promise<void> => {
  const app = new AppConfig();
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
