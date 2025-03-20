import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Order } from '../../order/entities/order.entity';

@Entity({ name: 'films' })
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', default: 0 }) // ✅ Указали, что рейтинг — float
  rating: number;

  @Column()
  director: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  title: string;

  @Column('text')
  about: string;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @Column()
  cover: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedules: Schedule[];

  @OneToMany(() => Order, (order) => order.film) // ✅ Убрали cascade, чтобы заказы не удалялись с фильмом
  orders: Order[];
}
