import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      const queryBuilder = this.filmRepository
        .createQueryBuilder('film')
        .leftJoinAndSelect('film.schedules', 'schedules'); // ✅ Исправлено

      const [items, total] = await queryBuilder.getManyAndCount();

      return { items, total };
    } catch (error) {
      console.error('🔥 Ошибка в findAll:', error);
      throw new InternalServerErrorException('Ошибка при получении фильмов');
    }
  }

  async findOne(id: string): Promise<{ items: Schedule[]; total: number }> {
    try {
      const film = await this.filmRepository.findOne({
        where: { id },
        relations: ['schedules'], // ✅ Исправлено: `schedule` → `schedules`
      });

      if (!film) {
        throw new NotFoundException(`Фильм с ID ${id} не найден.`);
      }

      return {
        items: film.schedules ?? [],
        total: film.schedules?.length ?? 0,
      };
    } catch (error) {
      console.error('🔥 Ошибка в findOne:', error); // ✅ Логируем ошибку
      throw new InternalServerErrorException('Ошибка при получении фильма');
    }
  }

  async create(createFilmDto: CreateFilmsDto): Promise<Film> {
    try {
      const newFilm = this.filmRepository.create({
        ...createFilmDto,
        schedules:
          createFilmDto.schedule?.map((scheduleDto) => {
            return Object.assign(new Schedule(), {
              ...scheduleDto,
              daytime: new Date(scheduleDto.daytime), // ✅ Исправлено
            });
          }) ?? [],
      });

      return await this.filmRepository.save(newFilm);
    } catch (error) {
      console.error('🔥 Ошибка в create:', error); // ✅ Логируем ошибку
      throw new InternalServerErrorException('Ошибка при создании фильма');
    }
  }
}
