import { UserModel } from '@domain/userModel';
import { Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(2, 100)
  name: string;
}
