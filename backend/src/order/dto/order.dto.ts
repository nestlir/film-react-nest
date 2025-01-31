//TODO реализовать DTO для /orders
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
  IsDate,
} from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}


export class TicketDto {
  @IsString()
  film: string;

  @IsString()
  schedule: string;

  @IsDate()
  @Type(() => Date)
  daytime: Date;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class PaymentDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}