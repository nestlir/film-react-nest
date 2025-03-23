import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateTicketDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() tickets: CreateTicketDto[]) {
    const result = await this.orderService.createOrders(tickets);
    return {
      total: result.length,
      items: result,
    };
  }
}
