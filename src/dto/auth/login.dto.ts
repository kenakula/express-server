import { IsDefined, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @MinLength(6)
  password: string;
}
