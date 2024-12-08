import { BaseController } from '@controller/base.controller';
import  { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectLiteral } from 'typeorm';

export class RootController extends BaseController<ObjectLiteral> {
  path: '/';
  healthCheckPath = '/health';
  router = Router();

  constructor() {
    super();

    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getRootData);
    this.router.get(this.healthCheckPath, this.getHealth);
  }

  public getRootData = (_req: Request, res: Response): void => {
    res.status(StatusCodes.OK).send({
      app: {
        name: 'TestApp',
        version: '1.0.0',
      }
    });
  };

  private getHealth = (_req: Request, res: Response): void => {
    res.status(StatusCodes.OK).send('OK');
  };
}
