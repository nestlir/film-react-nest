import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsRepository } from '../repository/films.repository';
import { Film } from './entities/films.entity';
import { Schedule } from './entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  providers: [FilmsService, FilmsRepository],
  controllers: [FilmsController],
  exports: [FilmsService, TypeOrmModule],
})
export class FilmsModule {}
