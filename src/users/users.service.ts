import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['dogs'] });
  }

  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['fullName', 'birthday', 'isActive'],
      where: [{ id: _id }],
    });
  }

  async updateUser(user: User) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    // const userToDelete = await this.usersRepository.findOne({
    //   where: {
    //     id: _id,
    //   },
    // });
    // return userToDelete;
    this.usersRepository.delete(user);
  }
}
