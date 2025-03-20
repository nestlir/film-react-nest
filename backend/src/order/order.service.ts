import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrdersDto, TicketsDto } from './dto/order.dto';
import { Film } from '../films/entities/films.entity';
import { Schedule } from '../films/entities/schedule.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['film', 'session'],
    });
  }

  async createOrder(orderDto: CreateOrdersDto): Promise<Order[]> {
    console.log(
      '🛒 Создание заказа с данными:',
      JSON.stringify(orderDto, null, 2),
    );

    if (!orderDto.tickets || !Array.isArray(orderDto.tickets)) {
      throw new BadRequestException('❌ Ошибка: tickets должен быть массивом');
    }

    const orders = await Promise.all(
      orderDto.tickets.map((ticket) => this.processTicket(ticket, orderDto)),
    );

    return orders;
  }

  async processTicket(
    ticket: TicketsDto,
    orderDto: CreateOrdersDto,
  ): Promise<Order> {
    console.log('🎟️ Обрабатываем билет:', JSON.stringify(ticket, null, 2));

    if (
      !ticket ||
      !ticket.film ||
      !ticket.session ||
      !ticket.row ||
      !ticket.seat
    ) {
      throw new BadRequestException('❌ Ошибка: данные билета некорректны');
    }

    const filmEntity = await this.filmRepository.findOne({
      where: { id: String(ticket.film) },
      relations: ['schedules'], // ✅ Правильное имя связи
    });

    if (!filmEntity) {
      throw new NotFoundException(`❌ Фильм с ID ${ticket.film} не найден.`);
    }

    const sessionEntity = await this.scheduleRepository.findOne({
      where: { id: String(ticket.session), film: { id: ticket.film } },
    });

    if (!sessionEntity) {
      throw new NotFoundException(`❌ Сеанс с ID ${ticket.session} не найден.`);
    }

    const seatCode = `${ticket.row}:${ticket.seat}`;
    const isTaken =
      Array.isArray(sessionEntity.taken) &&
      sessionEntity.taken.includes(seatCode);

    if (isTaken) {
      throw new BadRequestException(`❌ Место ${seatCode} уже забронировано.`);
    }

    const newOrder = this.orderRepository.create({
      film: filmEntity,
      session: sessionEntity,
      row: ticket.row,
      seat: ticket.seat,
      email: orderDto.email,
      phone: orderDto.phone,
    });

    await this.orderRepository.save(newOrder);

    sessionEntity.taken = sessionEntity.taken
      ? [...sessionEntity.taken, seatCode]
      : [seatCode];
    await this.scheduleRepository.save(sessionEntity);

    return newOrder;
  }
}
