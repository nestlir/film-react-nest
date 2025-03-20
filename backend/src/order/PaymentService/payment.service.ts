import { Injectable } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { PaymentDto } from '../dto/order.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly orderService: OrderService) {}

  async processPayment(
    orderId: string,
    paymentDto: PaymentDto,
  ): Promise<string> {
    const order = await this.orderService.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // Проверяем соответствие email и phone
    if (order.email !== paymentDto.email || order.phone !== paymentDto.phone) {
      throw new Error('Email or phone does not match the order');
    }

    // Логика оплаты (интеграция с платежной системой)
    return 'Payment successful';
  }
}
