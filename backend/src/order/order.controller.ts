import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, GetOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{ total: number; items: GetOrderDto[] }> {
    const { tickets, email, phone } = createOrderDto;
    const items = await this.orderService.createOrder(tickets, email, phone);

    return {
      total: items.length,
      items,
    };
  }
}
