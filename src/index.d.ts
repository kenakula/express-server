import { UserEntity } from '@app/entities/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: UserEntity
    }
  }
}
