import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Film } from '../../films/entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Film, { eager: true })
  film: Film;

  @ManyToOne(() => Schedule, { eager: true })
  schedule: Schedule;

  @Column('jsonb')
  seats: string[];
}
