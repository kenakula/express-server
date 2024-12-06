
import { catchAllMiddleware } from '@middleware/catch-all.middleware';
import { healthCheckRouter } from '@router/health-check.router';
import { rootRouter } from '@router/root.router';
import { userRouter } from '@router/user.router';
import cors from 'cors';
import express, { Application,RequestHandler } from 'express';
import helmet from 'helmet';

export const createServer = (logger: RequestHandler): Application => {
  const app = express();

  app.use(logger);
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.disable('x-powered-by');

  app.use('/health', healthCheckRouter);
  app.use('/users', userRouter);
  app.use('/', rootRouter);

  app.use(catchAllMiddleware);

  return app;
};
