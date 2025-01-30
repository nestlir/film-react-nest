import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  releaseDate: Date;

  @Column()
  genre: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  sessions: Schedule[];
}
