import { UserEntity } from '@app/entities/user.entity';
import { Request } from 'express';

export interface IRequest extends Request {
  user?: UserEntity;
}
