import 'reflect-metadata';

import process from 'node:process';

import { AppConfig } from '@config/app.config';
import { DatabaseConfig } from '@config/database.config';
import { createLogger } from '@config/logger.config';
import { config } from 'dotenv';

config();

const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || '5000';
const logLevel = process.env.LOG_LEVEL ?? 'error';

const startServer = async (): Promise<void> => {
  const appLogger = createLogger(logLevel);
  const app = new AppConfig(appLogger, port, host);
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
