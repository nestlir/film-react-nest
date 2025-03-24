import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { Film } from '../films/entities/films.entity';
import { Schedule } from '../films/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Film, Schedule])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
