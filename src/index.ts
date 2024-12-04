import * as http from 'node:http';

import { createServer } from '@config/express';
import { config } from 'dotenv';
import { AddressInfo } from 'net';

config();

const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || '5000';

const startServer = async (): Promise<void> => {
  const app = createServer();

  const server = http.createServer(app).listen({ port, host }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(
      `Server ready at http://${addressInfo.address}:${addressInfo.port}`
    );
  });

  process.on('uncaughtException', (error) => {
    console.log(error);
  });
};

startServer();
