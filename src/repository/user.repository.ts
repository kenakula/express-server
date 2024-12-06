import { UserEntity } from '@app/entities/user.entity';
import { DatabaseSource } from '@config/database.config';
import { BaseRepository } from '@repository/base.repository';
import { Repository } from 'typeorm';

export class UserRepository implements BaseRepository<UserEntity> {
  private readonly dbRepository: Repository<UserEntity>;

  constructor() {
    this.dbRepository = DatabaseSource.getRepository(UserEntity);
  }

  getAll(): Promise<UserEntity[]> {
    return this.dbRepository.find();
  }

  create(data: UserEntity): Promise<UserEntity> {
    return this.dbRepository.save(data);
  }
}
