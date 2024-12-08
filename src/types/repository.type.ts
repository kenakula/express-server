import { ObjectLiteral, Repository } from 'typeorm';

export type TRepository<T extends ObjectLiteral> = {
  dbRepository: Repository<T>;
};
