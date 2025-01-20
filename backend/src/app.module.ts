import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilmsModule } from './films/module/films.module';
import { OrderModule } from './order/module/order.module';

@Module({
  imports: [
    // Подключение к MongoDB
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost:27017/practicum',
    ),
    // Раздача статического контента
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/content/afisha',
    }),
    // Импорт модулей
    FilmsModule,
    OrderModule,
  ],
})
export class AppModule {}
