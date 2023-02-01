import './tracer';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { WorkerModule } from './worker/worker.module';
import { CronProducerService } from './worker/producer/cron-producer.service';

// Check https://stackoverflow.com/questions/70230659/nestjs-run-worker-in-a-separate-process
async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  const logger = app.get(Logger);
  const producerService = app.get(CronProducerService);
  app.useLogger(logger);
  logger.log({ message: 'enqueing cron jobs' });
  await producerService.enqueueCron();
  await app.listen(4444); // is this necessary ?
}
bootstrap();
