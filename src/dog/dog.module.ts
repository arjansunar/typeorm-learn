import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogEntity } from './dog.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity, User])],
  providers: [DogService],
  controllers: [DogController],
})
export class DogModule {}
