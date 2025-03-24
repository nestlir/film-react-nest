import {
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsISO8601,
  IsInt,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO для создания расписания фильма
export class CreateScheduleDto {
  @IsISO8601()
  daytime: string;

  @IsString()
  hall: string;

  @IsInt()
  rows: number;

  @IsInt()
  seats: number;

  @IsInt()
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  taken: string[];
}

// DTO для создания фильма
export class CreateFilmDto {
  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  image: string;

  @IsString()
  cover: string;

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => CreateScheduleDto)
  schedules: CreateScheduleDto[];
}

// DTO для получения расписания фильма
export class GetScheduleDto {
  @IsUUID()
  id: string;

  @IsISO8601()
  daytime: string;

  @IsString()
  hall: string;

  @IsInt()
  rows: number;

  @IsInt()
  seats: number;

  @IsInt()
  price: number;

  @IsArray()
  taken: string[];
}

// DTO для получения фильма
export class GetFilmDto {
  @IsUUID()
  id: string;

  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  tags: string[];

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  cover: string;

  @ValidateNested({ each: true })
  @Type(() => GetScheduleDto)
  schedules: GetScheduleDto[];
}
