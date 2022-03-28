import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthCreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'email for user authentication' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'corresponding password for user authentication',
  })
  password: string;
}
