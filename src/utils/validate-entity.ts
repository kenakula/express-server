import { validate } from 'class-validator';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateEntity = async <T extends object>(res: Response, object: T): Promise<boolean> => {
  const errors = await validate(object);

  if (errors.length === 0) {
    return true;
  }

  const error = errors.map(error => ({
    name: error.property,
    message: error.constraints,
    status: StatusCodes.BAD_REQUEST,
  }));

  if (!res.headersSent) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }

  return false;
};
