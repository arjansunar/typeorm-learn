import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

import { DogEntity } from './dog.entity';
import { DogDTO } from './dto/dog.dto';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(DogEntity) private dogRepository: Repository<DogEntity>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll() {
    return await this.dogRepository.find({ relations: ['user'] });
  }

  async create(dog: DogDTO): Promise<DogEntity> {
    const { userId } = dog;
    const user = await this.userRepository.findOne(userId);
    const newDog = {
      name: dog.name,
      user,
    };
    return await this.dogRepository.save(newDog);
  }
}
