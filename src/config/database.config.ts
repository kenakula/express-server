import { UserEntity } from '@app/entities/user.entity';
import { DataSource } from 'typeorm';

import { appConfig } from './app.config';

export const DatabaseConfig = new DataSource({
  type: 'postgres',
  entities: [UserEntity],
  synchronize: true,
  logging: false,
  ...appConfig.database,
});

