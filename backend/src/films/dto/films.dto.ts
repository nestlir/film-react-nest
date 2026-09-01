//TODO описать DTO для запросов к /films

import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  genre: string;

  @IsUUID()
  scheduleId: string;
}
