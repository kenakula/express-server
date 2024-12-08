import { BaseRepository } from '@repository/base.repository';
import { Router } from 'express';
import { ObjectLiteral } from 'typeorm';

export abstract class BaseController<T extends ObjectLiteral> {
  path: string = '';
  repository: BaseRepository<T>;
  router: Router;

  public initializeRoutes(): void {}
}
