import { HttpException } from '@models/exceptions/http-exception';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

export const validationMiddleware = <T extends ClassConstructor<object>>(type: T): RequestHandler => (
  req,
  _res,
  next
) => {
  validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
    console.log('errors', errors);

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
