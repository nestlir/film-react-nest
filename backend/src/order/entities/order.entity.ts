import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Film } from '../../films/entities/films.entity';
import { Schedule } from '../../films/entities/schedule.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Film, (film) => film.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'filmId' })
  film: Film;

  @ManyToOne(() => Schedule, (session) => session.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sessionId' })
  session: Schedule;

  @Column()
  row: number;

  @Column()
  seat: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  orderGroupId: string;
}
