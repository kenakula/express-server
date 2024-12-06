import { User } from '@app/domain/user';
import { Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(2, 100)
  name: string;
}
