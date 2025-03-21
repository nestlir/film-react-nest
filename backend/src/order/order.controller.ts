import {
  Controller,
  Post,
  Get,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.orderService.createOrder(createOrderDto);
    } catch (error) {
      console.error(
        '🔴 Ошибка при создании заказа:',
        error.message,
        error.stack,
      );
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
}
