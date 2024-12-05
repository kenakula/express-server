import * as process from 'node:process';

import { UserEntity } from '@app/entities/user.entity';
import { DataSource } from 'typeorm';

export const DatabaseSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER ?? 'admin',
  password: process.env.DB_PASSWORD ?? 'admin',
  database: process.env.DB_NAME ?? 'testDb',
  entities: [UserEntity],
  synchronize: true,
  logging: false,
});
