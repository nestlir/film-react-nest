import { Module } from '@nestjs/common';
import { OrderModule } from '../module/order.module';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [OrderModule], // Подключаем OrderModule
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
