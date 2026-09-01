import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '../../repository/in-memory.repository';
import { FilmDto } from '../dto/films.dto';

@Injectable()
export class FilmsService {
  private repository = new InMemoryRepository<FilmDto>();

  getAllFilms() {
    return this.repository.getAll();
  }

  getFilmById(id: string) {
    return this.repository.findById(id);
  }
}
