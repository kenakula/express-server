import { UserEntity } from '@app/entities/user.entity';
import { DatabaseConfig } from '@config/database.config';
import { BaseRepository } from '@repository/base.repository';
import { Repository } from 'typeorm';

export class UserRepository extends BaseRepository<UserEntity> {
  dbRepository: Repository<UserEntity>;

  constructor() {
    super();
    this.dbRepository = DatabaseConfig.getRepository(UserEntity);
  }

  getAll(): Promise<UserEntity[]> {
    return this.dbRepository.find();
  }

  create(data: UserEntity): Promise<UserEntity> {
    return this.dbRepository.save(data);
  }
}
