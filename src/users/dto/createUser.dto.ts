import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email of user' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'password of user' })
  password: string;
}
