import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from '../service/films.service';

@Controller('api/afisha/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAllFilms() {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  getFilmSchedule(@Param('id') id: string) {
    return this.filmsService.getFilmById(id);
  }
}
