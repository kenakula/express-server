
import { UserEntity } from '@app/entities/user.entity';
import { DatabaseSource } from '@config/database.config';
import { catchAllMiddleware } from '@middleware/catch-all.middleware';
import { healthCheckRouter } from '@router/health-check.router';
import { rootRouter } from '@router/root.router';
import { validate } from 'class-validator';
import cors from 'cors';
import express, { Application, Request,RequestHandler, Response } from 'express';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';

export const createServer = (logger: RequestHandler): Application => {
  const app = express();

  app.use(logger);
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.disable('x-powered-by');

  app.use(healthCheckRouter);
  app.use(rootRouter);

  const userRepository = DatabaseSource.getRepository(UserEntity);

  app.post('/users', async (req, res) => {
    try {
      const { username } = req.body;

      const user = new UserEntity();
      user.name = username;

      const errors = await validate(user);

      if (errors.length) {
        const errorsMessage = errors.map(error => ({
          name: error.property,
          message: error.constraints,
        }));

        res.status(StatusCodes.BAD_REQUEST).send(errorsMessage);
      } else {
        const createdUser = await userRepository.save(user);
        res.status(StatusCodes.CREATED).send(createdUser);
      }

    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  });

  app.get('/users', async (req: Request, res: Response) => {
    const users = await userRepository.find();

    res.status(200).send(users);
  });

  app.use(catchAllMiddleware);

  return app;
};
