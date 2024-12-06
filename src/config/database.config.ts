import * as process from 'node:process';

import { UserEntity } from '@app/entities/user.entity';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export const DatabaseConfig = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity],
  synchronize: true,
  logging: false,
});

