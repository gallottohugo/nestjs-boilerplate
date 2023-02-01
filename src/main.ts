import './tracer';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useLogger(logger);
  app.setGlobalPrefix('/api/v1');
  app.enableShutdownHooks();
  const port = configService.get('PORT');
  await app.listen(port);
  logger.log(`running server on ${port}`);
}
bootstrap();
