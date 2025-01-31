import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity'; // Заменяем MongooseSchema на TypeORM Entity
import { OrderService } from '../service/order.service';
import { OrderController } from '../controller/order.controller';
import { Schedule } from 'src/films/entities/schedule.entity';
import { ScheduleModule } from 'src/films/module/films.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Schedule]), // Добавляем Schedule
    ScheduleModule, // Подключаем модуль Schedule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}