//TODO описать DTO для запросов к /films

export class FilmDto {
  id: string;
  title: string;
  description: string;
  rating: number;
  director: string;
  tags: string[];
}
