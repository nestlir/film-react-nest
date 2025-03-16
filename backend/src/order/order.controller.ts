import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrdersDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  async createOrder(@Body() createOrderDto: CreateOrdersDto) {
    return this.orderService.createOrder(createOrderDto);
  }
}
