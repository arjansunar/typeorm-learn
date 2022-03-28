import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['dogs'] });
  }

  async getUser(_id: number): Promise<User> {
    return await this.usersRepository.findOne({
      select: ['email', 'id'],
      where: [{ id: _id }],
      relations: ['dogs'],
    });
  }

  async getUserById(_id: number): Promise<User> {
    return await this.usersRepository.findOne({
      select: ['id', 'email'],
      where: [{ id: _id }],
    });
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: [{ email: email }],
    });
  }

  async updateUser(user: User) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }
}
