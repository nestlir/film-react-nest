import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Film } from './film.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: Date;

  @ManyToOne(() => Film, (film) => film.sessions, { onDelete: 'CASCADE' })
  film: Film;
  orders: any;
}
