import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '../../repository/in-memory.repository';
import { OrderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  private repository = new InMemoryRepository<OrderDto>();

  createOrder(order: OrderDto) {
    this.repository.add(order);
    return order;
  }
}
