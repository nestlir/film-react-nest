import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Film } from '../../films/entities/films.entity';
import { Schedule } from '../../films/entities/schedule.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Film, (film) => film.orders, { onDelete: 'CASCADE' })
  film: Film;

  @ManyToOne(() => Schedule, (schedule) => schedule.orders, {
    onDelete: 'CASCADE',
  })
  session: Schedule;

  @Column()
  row: number;

  @Column()
  seat: number;
}
