export class TicketsDto {
  film: string;
  session: number;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
}

export class CreateOrdersDto {
  email: string;
  phone: string;
  tickets: TicketsDto[];
}
