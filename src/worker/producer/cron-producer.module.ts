import { Module } from '@nestjs/common';
import { CronProducerService } from './cron-producer.service';
import { BullConfigModule } from '../bull-config/bull-config.module';

@Module({
  imports: [BullConfigModule],
  controllers: [],
  providers: [CronProducerService],
})
export class CronProducerModule {}
