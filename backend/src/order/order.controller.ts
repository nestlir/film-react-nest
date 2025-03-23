import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { TicketDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() tickets: TicketDto[]) {
    const result = await this.orderService.create(tickets);
    return {
      total: result.length,
      items: result,
    };
  }
}
