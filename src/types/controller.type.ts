import { Router } from 'express';
import { ObjectLiteral } from 'typeorm';

import { TRepository } from './repository.type';

export type TController<T extends ObjectLiteral> = {
  router: Router;
  repository: TRepository<T>;
};
