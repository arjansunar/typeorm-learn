import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { AuthCreateUserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() user: CreateUserDTO) {
    return await this.authService.signUp(user);
  }
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() user: AuthCreateUserDTO) {
    return await this.authService.signIn(user);
  }
}
