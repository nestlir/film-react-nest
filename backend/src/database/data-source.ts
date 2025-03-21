import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'prac',
  password: process.env.DATABASE_PASSWORD || '2706',
  database: process.env.DATABASE_NAME || 'prac',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // ✅ Проверен путь
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'], // ✅ Исправил путь
  synchronize: false,
  logging: true,
});
