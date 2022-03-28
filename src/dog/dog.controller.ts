import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogDTO } from './dto/dog.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('dog')
export class DogController {
  constructor(private dogService: DogService) {}
  @Get()
  getAll() {
    return this.dogService.findAll();
  }

  @Post()
  create(@Body() dog: DogDTO) {
    return this.dogService.create(dog);
  }
}
