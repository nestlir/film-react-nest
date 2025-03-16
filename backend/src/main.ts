import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const loggerType = process.env.LOGGER_TYPE || 'json';
  let logger;

  if (loggerType === 'tskv') {
    logger = new TskvLogger();
  } else {
    logger = new JsonLogger();
  }

  app.useLogger(logger);

  await app.listen(3000);
}
bootstrap();
