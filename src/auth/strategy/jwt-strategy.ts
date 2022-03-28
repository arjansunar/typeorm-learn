import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt-secret',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const { sub: id } = payload;
    const user = await this.usersRepository.findOne({
      select: ['id', 'email'],
      where: [{ id: id }],
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
