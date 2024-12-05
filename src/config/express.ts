
import cors from 'cors';
import express, { Application, RequestHandler } from 'express';
import helmet from 'helmet';

export const createServer = (logger: RequestHandler): Application => {
  const app = express();

  app.use(logger);
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.status(200).send({ message: 'UP' });
  });

  return app;
};
