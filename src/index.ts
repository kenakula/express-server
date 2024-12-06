import 'reflect-metadata';

import * as http from 'node:http';

import { DatabaseSource } from '@config/database.config';
import { createServer } from '@config/express.config';
import { loggerConfig } from '@config/logger.config';
import { config } from 'dotenv';
import { AddressInfo } from 'net';

config();

const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || '5000';

const startServer = async (): Promise<void> => {
  const app = createServer(loggerConfig);

  try {
    await DatabaseSource.initialize();
    loggerConfig.logger.info('Database connection started');
    const server = http.createServer(app).listen({ port, host }, () => {
      const addressInfo = server.address() as AddressInfo;
      loggerConfig.logger.info(`Server ready at http://${addressInfo.address}:${addressInfo.port}`);
    });
  } catch (error) {
    loggerConfig.logger.error(error);
  }

  process.on('uncaughtException', (error) => {
    loggerConfig.logger.error(error);
  });
};

startServer();
