import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogModule } from './dog/dog.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DogModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
