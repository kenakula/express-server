import { TController } from '@app/types';
import { UserRepository } from '@repository/user.repository';
import  { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectLiteral } from 'typeorm';

export class RootController implements TController<ObjectLiteral> {
  healthCheckPath = '/health';
  path: string;
  router = Router();
  // TODO rootRepository
  repository = new UserRepository();

  constructor() {
    this.path = '';
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
