import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Film } from '../../films/entities/film.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Film, (film) => film.sessions, { onDelete: 'CASCADE' })
  film: Film;

  @Column()
  time: Date;

  @Column('jsonb', { default: [] })
  availableSeats: string[];
}
