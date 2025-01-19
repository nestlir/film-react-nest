import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderDto } from '../dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() order: OrderDto) {
    return this.orderService.createOrder(order);
  }
}
