import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ScheduleModule } from './films/module/films.module';
import { OrderModule } from './order/module/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Выбор СУБД
    process.env.DATABASE_DRIVER === 'postgres'
      ? TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DATABASE_HOST') as string,
            port:
              parseInt(configService.get('DATABASE_PORT') as string, 10) ||
              5432,
            username: configService.get('DATABASE_USERNAME') as string,
            password: configService.get('DATABASE_PASSWORD') as string,
            database: configService.get('DATABASE_NAME') as string,
            autoLoadEntities: true,
            synchronize: configService.get<boolean>('DB_SYNCHRONIZE') || false,
          }),
        })
      : MongooseModule.forRoot(
          process.env.DATABASE_URL || 'mongodb://localhost:27017/prac',
        ),

    // Подключение статического контента
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/content/afisha',
    }),

    // Подключение модулей
    ScheduleModule,
    OrderModule,
  ],
})
export class AppModule {}
