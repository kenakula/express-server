import { HttpException } from '@models/http-exception';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

export const validationMiddleware = <T extends ClassConstructor<object>>(
  type: T,
  skipMissingProperties = false
): RequestHandler => (
  req,
  _res,
  next
) => {
  validate(plainToClass(type, req.body), { skipMissingProperties }).then((errors: ValidationError[]) => {
    if (errors.length) {
      const message = errors.map((error: ValidationError) => error.constraints
        ? Object.values(error.constraints).join(', ')
        : '').join('; ');
      next(new HttpException(400, message));
    } else {
      next();
    }
  });
};
