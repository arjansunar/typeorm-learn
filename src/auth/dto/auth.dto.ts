import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class AuthCreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
