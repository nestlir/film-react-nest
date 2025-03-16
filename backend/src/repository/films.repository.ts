import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/films.entity';
import { CreateFilmsDto } from '../films/dto/films.dto';
import { Schedule } from '../films/entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<{ items: Film[]; total: number }> {
    const queryBuilder = this.filmRepository
      .createQueryBuilder('film')
      .leftJoinAndSelect('film.schedule', 'schedule');

    const [items, total] = await queryBuilder.getManyAndCount();

    return { items, total };
  }

  async findOne(id: string): Promise<{ items: Schedule[]; total: number }> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'], // Загружаем расписание
    });

    return {
      items: film?.schedule ?? [],
      total: film?.schedule?.length ?? 0,
    };
  }

  async create(createFilmDto: CreateFilmsDto): Promise<Film> {
    const newFilm = this.filmRepository.create({
      ...createFilmDto,
      schedule:
        createFilmDto.schedule?.map((scheduleDto) => {
          const schedule = new Schedule();
          Object.assign(schedule, scheduleDto);
          return schedule; // Преобразуем GetScheduleDto в Schedule
        }) ?? [],
    });

    return this.filmRepository.save(newFilm);
  }
}
