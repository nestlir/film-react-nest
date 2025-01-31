import { Controller, Post, Param, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from '../dto/order.dto';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':orderId')
  async processPayment(
    @Param('orderId') orderId: string,
    @Body() paymentDto: PaymentDto, // Используем DTO
  ): Promise<{ message: string }> {
    const result = await this.paymentService.processPayment(orderId, paymentDto);
    return { message: result };
  }
}
