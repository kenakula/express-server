import { UserEntity } from '@app/entities/user.entity';
import { TRepository } from '@app/types';
import { DatabaseConfig } from '@config/database.config';
import { Repository } from 'typeorm';

export class UserRepository implements TRepository<UserEntity> {
  dbRepository: Repository<UserEntity>;

  constructor() {
    this.dbRepository = DatabaseConfig.getRepository(UserEntity);
  }

  getAll(): Promise<UserEntity[]> {
    return this.dbRepository.find();
  }

  create(data: UserEntity): Promise<UserEntity> {
    return this.dbRepository.save(data);
  }
}
