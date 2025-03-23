import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsDateString()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}
