import { UserEntity } from '@app/entities/user.entity';
import { BaseController } from '@controller/base.controller';
import { validationMiddleware } from '@middleware/validation.middleware';
import { UserRepository } from '@repository/user.repository';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

export class UserController extends BaseController<UserEntity> {
  path: '/';
  repository = new UserRepository();
  router  = Router();

  constructor() {
    super();

    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getAllUsers);
    this.router.post(this.path, validationMiddleware(UserEntity), this.createUser);
  }

  public getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.repository.getAll();

      res.status(StatusCodes.OK).send(users);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;

      const user = new UserEntity();
      user.name = name;

      const createdUser = await this.repository.create(user);
      res.status(StatusCodes.CREATED).send(createdUser);

    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };
}
