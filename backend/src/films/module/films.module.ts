import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../entities/film.entity'; // Используем TypeORM-модель
import { FilmsService } from '../service/films.service';
import { FilmsController } from '../controller/films.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Film])], // Используем TypeORM, а не Mongoose
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}
