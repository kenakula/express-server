import { Router } from 'express';
import { ObjectLiteral } from 'typeorm';

import { TRepository } from './repository.type';

export type TController<T extends ObjectLiteral> = {
  router: Router;
  path: string;
  repository: TRepository<T>;
  initializeRoutes: () => void;
};
