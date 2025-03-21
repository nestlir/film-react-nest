import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto, TicketDto, GetOrderDto } from './dto/order.dto';
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
    return this.orderRepository.find({ relations: ['film', 'session'] });
  }

  async createOrder(dto: CreateOrderDto): Promise<GetOrderDto[]> {
    return Promise.all(
      dto.tickets.map((ticket) => this.processTicket(ticket, dto)),
    );
  }

  private async processTicket(
    ticket: TicketDto,
    dto: CreateOrderDto,
  ): Promise<GetOrderDto> {
    const film = await this.filmRepository.findOne({
      where: { id: ticket.film },
    });
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${ticket.film} не найден.`);
    }

    const session = await this.scheduleRepository.findOne({
      where: { id: ticket.session, film: { id: ticket.film } },
      relations: ['film'], // ✅ добавлено relations
    });
    if (!session) {
      throw new NotFoundException(`Сеанс с ID ${ticket.session} не найден.`);
    }

    if (!Array.isArray(session.taken)) {
      session.taken = []; // ✅ защита от пустого массива
    }

    const seatCode = `${ticket.row}:${ticket.seat}`;
    if (session.taken.includes(seatCode)) {
      throw new BadRequestException(`Место ${seatCode} уже забронировано.`);
    }

    session.taken.push(seatCode);
    await this.scheduleRepository.save(session);

    const order = this.orderRepository.create({
      film,
      session,
      row: ticket.row,
      seat: ticket.seat,
      email: dto.email,
      phone: dto.phone,
    });

    const savedOrder = await this.orderRepository.save(order);

    return {
      id: savedOrder.id,
      filmId: savedOrder.film.id,
      sessionId: savedOrder.session.id,
      row: savedOrder.row,
      seat: savedOrder.seat,
      email: savedOrder.email,
      phone: savedOrder.phone,
    };
  }
}
