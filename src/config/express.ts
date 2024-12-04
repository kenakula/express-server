import cors from 'cors';
import express, { Application } from 'express';

export const createServer = (): Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.status(200).send({ message: 'UP' });
  });

  return app;
};
