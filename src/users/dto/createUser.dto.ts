import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
