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

  async createOrder(orderDto: CreateOrdersDto): Promise<string> {
    await Promise.all(
      orderDto.tickets.map((ticket) => this.processTicket(ticket)),
    );
    return `Билеты куплены`;
  }

  async processTicket(ticket: TicketsDto): Promise<void> {
    const { film, session, row, seat } = ticket;
    const seatCode = this.getSeatCode(row, seat);

    // Приведение ID к правильному типу
    const filmId = String(film); // Фильм использует UUID (строка)
    const sessionId = Number(session); // Сеанс использует number

    // Проверяем, существует ли фильм
    const filmEntity = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });

    if (!filmEntity) {
      throw new NotFoundException(`Фильм с ID ${film} не найден.`);
    }

    // Проверяем, существует ли сеанс
    const sessionEntity = await this.scheduleRepository.findOne({
      where: { id: sessionId, film: { id: filmId } }, // id теперь number
    });

    if (!sessionEntity) {
      throw new NotFoundException(`Сеанс с ID ${session} не найден.`);
    }

    // Проверяем, занято ли место
    const isTaken = sessionEntity.taken.includes(seatCode);
    if (isTaken) {
      throw new BadRequestException(`Место ${seatCode} уже забронировано.`);
    }

    // Добавляем заказ с правильными объектами
    const newOrder = this.orderRepository.create({
      film: filmEntity,
      session: sessionEntity,
      row,
      seat,
    });

    await this.orderRepository.save(newOrder);

    // Обновляем список занятых мест
    sessionEntity.taken.push(seatCode);
    await this.scheduleRepository.save(sessionEntity);
  }

  private getSeatCode(row: number, seat: number): string {
    return `${row}:${seat}`;
  }
}
