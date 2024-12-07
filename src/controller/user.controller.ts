import { UserEntity } from '@app/entities/user.entity';
import { UserRepository } from '@repository/user.repository';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class UserController {
  private readonly userRepository = new UserRepository();

  public getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userRepository.getAll();

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

      const createdUser = await this.userRepository.create(user);
      res.status(StatusCodes.CREATED).send(createdUser);

    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };
}
