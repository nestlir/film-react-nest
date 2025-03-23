import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { TicketDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Body() tickets: TicketDto[],
  ): Promise<{ total: number; items: Order[] }> {
    const items = await this.orderService.createOrders(tickets);
    return {
      total: items.length,
      items,
    };
  }
}
