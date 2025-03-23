import {
  IsString,
  IsArray,
  ValidateNested,
  IsEmail,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TicketDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}

// ✅ Добавь этот новый класс:
export class GetOrderDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
  id: string;
}
