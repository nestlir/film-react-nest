import { Controller, Post, Body } from '@nestjs/common';

@Controller('order')
export class OrdersController {
  @Post()
  createOrder(@Body() orderData: any) {
    return { message: 'Order created', data: orderData };
  }
}
