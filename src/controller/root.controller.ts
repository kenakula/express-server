import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getRootData = (_req: Request, res: Response): void => {
  res.status(StatusCodes.OK).send({
    app: {
      name: 'TestApp',
      version: '1.0.0',
    }
  });
};
