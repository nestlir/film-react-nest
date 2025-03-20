import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrdersDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@Controller('order') // <-- Префикс маршрута
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // ✅ POST /api/afisha/order
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrdersDto) {
    try {
      console.log(
        '📩 Полученные данные:',
        JSON.stringify(createOrderDto, null, 2),
      );

      // Проверка входных данных
      if (!createOrderDto.email || !createOrderDto.phone) {
        throw new BadRequestException('❌ Ошибка: email и phone обязательны');
      }

      if (!createOrderDto.tickets || !Array.isArray(createOrderDto.tickets)) {
        throw new BadRequestException(
          '❌ Ошибка: tickets должен быть массивом',
        );
      }

      return await this.orderService.createOrder(createOrderDto);
    } catch (error) {
      console.error('❌ Ошибка при создании заказа:', error);
      throw new InternalServerErrorException(
        '❌ Ошибка сервера при обработке заказа',
      );
    }
  }

  // ✅ GET /api/afisha/order
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }
}
