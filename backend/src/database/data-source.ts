import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Film } from '../films/entities/films.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { Order } from '../order/entities/order.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'film_db',
  entities: [Film, Schedule, Order],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // ❗️ Оставляем `false`, чтобы миграции работали
  logging: true,
});
