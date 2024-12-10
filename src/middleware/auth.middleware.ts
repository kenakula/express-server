import { IRequest } from '@app/interfaces';
import { TJWTPayload } from '@app/types';
import { appConfig } from '@config/app.config';
import { HttpException } from '@models/http-exception';
import { UserRepository } from '@repository/user.repository';
import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';

export const authMiddleware = async (req: IRequest, _res: Response, next: NextFunction): Promise<void> => {

  try {
    const cookies = req.cookies;
    const userRepository = new UserRepository();

    if (!cookies?.Authorization) return next(new HttpException(StatusCodes.UNAUTHORIZED, 'Unauthorized'));

    const verification = verify(cookies.Authorization, appConfig.secrets.jwtSecret) as TJWTPayload;
    const user = await userRepository.findById(verification._id);

    if (!user) return next(new HttpException(StatusCodes.UNAUTHORIZED, 'Unauthorized'));

    req.user = user;
  } catch (error) {
    next(new HttpException(StatusCodes.UNAUTHORIZED, `Unauthorized: ${error}`));
  }

  next();
};
