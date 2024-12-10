import * as process from 'node:process';

import { config } from 'dotenv';

config();

export const appConfig = {
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USER ?? 'admin',
    password: process.env.DB_PASSWORD ?? 'admin',
    database: process.env.DB_NAME ?? 'database',
  },
  server: {
    port: process.env.SERVER_PORT || '5000',
    host: process.env.SERVER_HOST || 'localhost',
    logLevel: process.env.SERVER_LOG_LEVEL ?? 'error',
  },
  secrets: {
    hashRounds: Number(process.env.HASH_ROUNDS ?? 10),
    jwtExpiresIn: Number(process.env.JWT_EXPIRES ?? 3600),
    jwtSecret: process.env.JWT_SECRET ?? '',
  },
};
