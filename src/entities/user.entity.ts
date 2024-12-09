import { UserModel } from '@models/user.model';
import { IsEmail, Length, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  @Length(2, 100)
  name: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    nullable: true,
  })
  @MinLength(6)
  password: string;
}
