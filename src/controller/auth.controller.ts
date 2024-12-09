import { UserEntity } from '@app/entities/user.entity';
import { TController } from '@app/types';
import { omitProperty } from '@app/utils/omit-property.util';
import { appConfig } from '@config/app.config';
import { LoginDto, RegisterUserDto } from '@dto/auth';
import { validationMiddleware } from '@middleware/validation.middleware';
import { HttpException } from '@models/http-exception';
import { UserRepository } from '@repository/user.repository';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AuthController implements TController<UserEntity> {
  repository = new UserRepository();
  path: string;
  router = Router();

  constructor() {
    this.path = 'auth';
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post('/login', validationMiddleware(LoginDto), this.login);
    this.router.post('/register', validationMiddleware(RegisterUserDto), this.register);
  };

  private register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { password, email }: RegisterUserDto = req.body;

    try {
      const isUserInDb = await this.repository.findByEmail(email);

      if (isUserInDb) {
        return next(new HttpException(StatusCodes.BAD_REQUEST, 'User already exists'));
      }

      // TODO вынести в крипто утиль
      const hashedPassword = await bcrypt.hash(password, appConfig.secrets.hashRounds);
      const user = new UserEntity();

      user.email = email;
      user.password = hashedPassword;

      const createdUser = await this.repository.create(user);
      res.status(StatusCodes.CREATED).send(omitProperty(createdUser, 'password'));
    } catch (error) {
      next(new HttpException(StatusCodes.BAD_REQUEST, `Something went wrong: ${JSON.stringify(error)}`));
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password }: LoginDto = req.body;

    try {
      const user = await this.repository.findByEmail(email);

      if (!user) {
        return next(new HttpException(StatusCodes.UNAUTHORIZED, 'Password or email incorrect'));
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return next(new HttpException(StatusCodes.UNAUTHORIZED, 'Password or email incorrect'));
      }

      res.status(StatusCodes.OK).send(omitProperty(user, 'password'));
    } catch (error) {
      next(new HttpException(StatusCodes.BAD_REQUEST, `Something went wrong: ${JSON.stringify(error)}`));
    }
  };
}
