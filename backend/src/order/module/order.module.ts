import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity'; // Заменяем MongooseSchema на TypeORM Entity
import { OrderService } from '../service/order.service';
import { OrderController } from '../controller/order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])], // Используем TypeORM вместо Mongoose
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
