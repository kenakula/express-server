import { TJwtData, TJWTPayload } from '@app/types';
import { appConfig } from '@config/app.config';
import { sign } from 'jsonwebtoken';
import { ObjectLiteral } from 'typeorm';

export const createToken = <T extends ObjectLiteral>(user: T): TJwtData => {
  const data: TJWTPayload = {
    _id: user.id,
  };

  const expiresIn = appConfig.secrets.jwtExpiresIn;

  return {
    expiresIn,
    token: sign(data, appConfig.secrets.jwtSecret, { expiresIn })
  };
};
