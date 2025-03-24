import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/films.entity';
import { Schedule } from './entities/schedule.entity';
import { CreateFilmDto, GetFilmDto, GetScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async createFilm(createFilmDto: CreateFilmDto): Promise<GetFilmDto> {
    const schedules = createFilmDto.schedules.map((scheduleDto) => {
      const schedule = new Schedule();
      Object.assign(schedule, scheduleDto);
      return schedule;
    });

    const newFilm = this.filmRepository.create({
      ...createFilmDto,
      schedules,
    });

    const film = await this.filmRepository.save(newFilm);

    return this.toGetFilmDto(film);
  }

  async findAll(): Promise<{ items: GetFilmDto[]; total: number }> {
    const [films, total] = await this.filmRepository.findAndCount({
      relations: ['schedules'],
    });

    const items = films.map((film) => this.toGetFilmDto(film));
    return { items, total };
  }

  async findSchedules(
    id: string,
  ): Promise<{ items: GetScheduleDto[]; total: number }> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });

    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден.`);
    }

    const items: GetScheduleDto[] = film.schedules.map((schedule) => ({
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    }));

    return {
      items,
      total: items.length,
    };
  }

  private toGetFilmDto(film: Film): GetFilmDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
      schedules: film.schedules.map((schedule) => ({
        id: schedule.id,
        daytime: schedule.daytime,
        hall: schedule.hall,
        rows: schedule.rows,
        seats: schedule.seats,
        price: schedule.price,
        taken: schedule.taken,
      })),
    };
  }
}
