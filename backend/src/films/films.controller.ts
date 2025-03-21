import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto, GetFilmDto, GetScheduleDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  create(@Body() createFilmDto: CreateFilmDto): Promise<GetFilmDto> {
    return this.filmsService.createFilm(createFilmDto);
  }

  @Get('')
  findAll(): Promise<{ items: GetFilmDto[]; total: number }> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  findSchedules(
    @Param('id') id: string,
  ): Promise<{ items: GetScheduleDto[]; total: number }> {
    return this.filmsService.findSchedules(id);
  }
}
