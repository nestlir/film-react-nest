import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { TicketDto } from './dto/order.dto';
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

  async create(tickets: TicketDto[]) {
    const orderGroupId = uuid();

    const savedOrders = await Promise.all(
      tickets.map((ticket) => this.processTicket(ticket, orderGroupId)),
    );

    // Возвращаем в нужном формате
    return savedOrders.map((order) => ({
      id: order.id,
      film: order.film.id,
      session: order.session.id,
      daytime: order.session.daytime,
      row: order.row,
      seat: order.seat,
      price: order.session.price,
    }));
  }

  private async processTicket(
    ticket: TicketDto,
    orderGroupId: string,
  ): Promise<Order> {
    const film = await this.filmRepository.findOne({
      where: { id: ticket.film },
    });
    if (!film)
      throw new NotFoundException(`Фильм с ID ${ticket.film} не найден`);

    const session = await this.scheduleRepository.findOne({
      where: { id: ticket.session, film: { id: ticket.film } },
      relations: ['film'],
    });
    if (!session)
      throw new NotFoundException(`Сеанс с ID ${ticket.session} не найден`);

    if (!Array.isArray(session.taken)) {
      session.taken = [];
    }

    const seatCode = `${ticket.row}:${ticket.seat}`;
    if (session.taken.includes(seatCode)) {
      throw new BadRequestException(`Место ${seatCode} уже занято`);
    }

    session.taken.push(seatCode);
    await this.scheduleRepository.save(session);

    const order = this.orderRepository.create({
      id: uuid(),
      film: session.film,
      session,
      row: ticket.row,
      seat: ticket.seat,
      orderGroupId,
    });

    return await this.orderRepository.save(order);
  }
}
