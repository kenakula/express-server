import express from 'express';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(StatusCodes.OK).send({ message: 'UP' });
});

export const healthCheckRouter = router;
