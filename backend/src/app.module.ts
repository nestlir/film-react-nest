import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { FilmsModule } from './films/films.module';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { FilmsRepository } from './repository/films.repository';
import { Film } from './films/entities/films.entity';
import { Schedule } from './films/entities/schedule.entity';
import { Order } from './order/entities/order.entity';

import { AppDataSource } from './database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),

    // ✅ Добавлено подключение к базе данных
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || '2706',
      database: process.env.DATABASE_NAME || 'film_db',
      entities: [Film, Schedule, Order],
      synchronize: false,
      logging: true,
    }),

    TypeOrmModule.forFeature([Film, Schedule, Order]),
    FilmsModule,

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha/',
    }),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsService, TypeOrmModule],
})
export class AppModule {}
