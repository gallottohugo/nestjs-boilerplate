import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_NAME, SYNCHRONIZER_JOB } from '../constants';

@Injectable()
export class CronProducerService {
  private readonly logger = new Logger(CronProducerService.name);
  constructor(@InjectQueue(QUEUE_NAME) private queue: Queue) {}

  async enqueueCron() {
    this.queue.on('error', (err) => {
      this.logger.log({ error: { message: err.message, name: err.name } });
    });
    await this.queue.add(
      SYNCHRONIZER_JOB,
      {},
      { repeat: { every: 5 * 60 * 1000 } },
    );
  }
}
