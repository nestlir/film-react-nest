import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { Film } from './films/entities/films.entity';
import { Schedule } from './films/entities/schedule.entity';
import { Order } from './order/entities/order.entity';

@Module({
  imports: [
    // Глобальная конфигурация приложения
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),

    // Подключение к базе данных PostgreSQL через TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'prac',
      password: process.env.DATABASE_PASSWORD || '2706',
      database: process.env.DATABASE_NAME || 'prac',
      entities: [Film, Schedule, Order],
      synchronize: false, // В продакшене оставьте false
      logging: true, // Для отладки запросов к базе
    }),

    // Модули приложения
    FilmsModule,
    OrderModule,

    // ServeStatic для отдачи статических файлов
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
})
export class AppModule {}
