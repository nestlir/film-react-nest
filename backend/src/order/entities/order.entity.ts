import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Schedule } from '../../films/entities/schedule.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.orders, { onDelete: 'CASCADE' })
  schedule: Schedule;

  @Column()
  seat: number;

  @Column()
  row: number;

  @Column()
  price: number;
}
