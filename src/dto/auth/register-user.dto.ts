import { Match } from '@app/utils/validators';
import { IsDefined, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @MinLength(6)
  password: string;

  @IsDefined()
  @Match<RegisterUserDto>('password')
  passwordConfirm: string;
}
