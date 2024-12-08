import { UserModel } from '@models/user.model';
import { IsEmail, Length, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(2, 100)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6)
  password: string;
}
