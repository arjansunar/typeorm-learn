import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthCreateUserDTO } from './dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async getHash(password: string) {
    return await argon.hash(password);
  }
  async signUp(user: AuthCreateUserDTO) {
    try {
      const hash = await this.getHash(user.password);
      const newUser: CreateUserDTO = {
        email: user.email,
        password: hash,
      };
      await this.userService.createUser(newUser);
    } catch (err) {
      throw new ForbiddenException('Credentials taken');
    }
  }

  async signIn(dtoUser: AuthCreateUserDTO) {
    // finding user
    const user = await this.userService.getUserByEmail(dtoUser.email);

    // return error if user not found
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const passwordMatches = await argon.verify(user.password, dtoUser.password);
    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');

    return await this.signToken(user.id, user.email);
  }

  async signToken(
    id: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: id,
      email,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    return {
      access_token: token,
    };
  }
}
