import { HttpException } from '@models/http-exception';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: HttpException, _req: Request, res: Response, _next: NextFunction): void => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).send({
    status,
    message,
  });
};
