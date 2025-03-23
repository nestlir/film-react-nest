import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { TicketDto, GetOrderDto } from './dto/order.dto';
import { Film } from '../films/entities/films.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { v4 as uuid } from 'uuid';

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
    return this.orderRepository.find({
      relations: ['film', 'session'],
    });
  }

  async createOrder(tickets: TicketDto[]): Promise<GetOrderDto[]> {
    const orderGroupId = uuid();

    return Promise.all(
      tickets.map((ticket) =>
        this.processTicket(
          ticket,
          'anonymous@example.com', // или "" если не нужны
          'no-phone',
          orderGroupId,
        ),
      ),
    );
  }

  private async processTicket(
    ticket: TicketDto,
    email: string,
    phone: string,
    orderGroupId: string,
  ): Promise<GetOrderDto> {
    const film = await this.filmRepository.findOne({
      where: { id: ticket.film },
    });
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${ticket.film} не найден.`);
    }

    // Проверка сессии
    const session = await this.scheduleRepository.findOne({
      where: { id: ticket.session, film: { id: ticket.film } },
      relations: ['film'],
    });
    if (!session) {
      throw new NotFoundException(`Сеанс с ID ${ticket.session} не найден.`);
    }

    // Защита от некорректного taken
    if (!Array.isArray(session.taken)) {
      session.taken = [];
    }

    // Проверка занятости места
    const seatCode = `${ticket.row}:${ticket.seat}`;
    if (session.taken.includes(seatCode)) {
      throw new BadRequestException(`Место ${seatCode} уже занято.`);
    }

    // Добавление места в занятие
    session.taken.push(seatCode);
    await this.scheduleRepository.save(session);

    // Создание заказа
    const order = this.orderRepository.create({
      id: uuid(),
      film: session.film,
      session,
      row: ticket.row,
      seat: ticket.seat,
      email,
      phone,
      orderGroupId,
    });

    const savedOrder = await this.orderRepository.save(order);

    return {
      film: savedOrder.film.id,
      session: savedOrder.session.id,
      daytime: session.daytime,
      row: savedOrder.row,
      seat: savedOrder.seat,
      price: ticket.price,
      id: savedOrder.id,
    };
  }
}
