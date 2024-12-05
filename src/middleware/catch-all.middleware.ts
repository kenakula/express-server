import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const catchAllMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction): void => {
  res.log.error(err);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');

  next(err);
};
