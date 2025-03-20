import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Schedule } from '../../films/entities/schedule.entity';
import { CreateOrderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  // Метод для получения заказа по ID
  async getOrderById(orderId: string): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['schedule'], // Загружаем связанные данные
    });

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    return order;
  }

  // Метод для создания заказа
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order[]> {
    const orders: Order[] = [];

    for (const ticket of createOrderDto.tickets) {
      const schedule = await this.scheduleRepository.findOne({
        where: { id: ticket.schedule },
      });

      if (!schedule) {
        throw new Error(`Schedule with ID ${ticket.schedule} not found`);
      }

      // Проверяем, занято ли место
      const existingOrder = await this.orderRepository.findOne({
        where: {
          schedule: schedule, // Исправлено: передаём объект schedule
          seat: ticket.seat,
          row: ticket.row,
        },
      });

      if (existingOrder) {
        throw new Error(`Seat ${ticket.row}-${ticket.seat} is already booked`);
      }

      // Создаём заказ
      const order = this.orderRepository.create({
        email: createOrderDto.email,
        phone: createOrderDto.phone,
        schedule: schedule,
        seat: ticket.seat,
        row: ticket.row,
        price: ticket.price,
      });

      const savedOrder = await this.orderRepository.save(order);
      orders.push(savedOrder);
    }

    return orders;
  }
}
