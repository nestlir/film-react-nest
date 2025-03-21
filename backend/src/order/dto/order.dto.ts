import {
  IsUUID,
  IsInt,
  Min,
  IsString,
  IsArray,
  IsEmail,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TicketDto {
  @IsUUID()
  film: string;

  @IsUUID()
  session: string;

  @IsInt()
  @Min(1)
  row: number;

  @IsInt()
  @Min(1)
  seat: number;

  @IsInt()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

// ✅ Добавь этот новый класс:
export class GetOrderDto {
  id: string;
  filmId: string;
  sessionId: string;
  row: number;
  seat: number;
  email: string;
  phone: string;
}
