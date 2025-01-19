import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/afisha/films')
export class FilmsController {
  @Get()
  getAllFilms() {
    return { message: 'List of films' };
  }

  @Get(':id/schedule')
  getFilmSchedule(@Param('id') id: string) {
    return { message: `Schedule for film ${id}` };
  }
}
