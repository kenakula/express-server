import { ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseRepository<T extends ObjectLiteral> {
  dbRepository: Repository<T>;
}
