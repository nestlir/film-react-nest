import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/films.entity';
import { CreateFilmsDto } from './dto/films.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async createFilm(createFilmDto: CreateFilmsDto): Promise<Film> {
    // Преобразуем `schedule` из `GetScheduleDto[]` в `Schedule[]`
    const scheduleEntities = createFilmDto.schedule.map((scheduleDto) => {
      const schedule = new Schedule();
      Object.assign(schedule, scheduleDto);
      return schedule;
    });

    const newFilm = this.filmRepository.create({
      ...createFilmDto,
      schedule: scheduleEntities, // ✅ Теперь schedule имеет правильный тип
    });

    return this.filmRepository.save(newFilm);
  }

  async findAll(): Promise<{ items: Film[]; total: number }> {
    const [items, total] = await this.filmRepository.findAndCount({
      relations: ['schedule'], // ✅ Загружаем расписания фильмов
    });
    return { items, total };
  }

  async findOne(id: string): Promise<{ items: Schedule[]; total: number }> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'], // ✅ Загружаем расписание фильма
    });

    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден.`);
    }

    return {
      items: film.schedule ?? [], // ✅ Возвращаем `items`, даже если расписания нет
      total: film.schedule?.length ?? 0,
    };
  }
}
