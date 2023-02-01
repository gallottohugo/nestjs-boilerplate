import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from '../../configuration/configuration.module';
import { QUEUE_NAME } from '../constants';

@Module({
  imports: [
    ConfigurationModule,
    BullModule.forRootAsync({
      useFactory: async () => {
        await ConfigModule.envVariablesLoaded;
        const redisUrl = process.env.BULL_REDIS_URL;
        const useTls = redisUrl.startsWith('rediss://');
        return {
          url: redisUrl,
          ...(useTls ? { redis: { tls: {} } } : {}),
        };
      },
    }),
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
  ],
  controllers: [],
  exports: [BullModule],
})
export class BullConfigModule {}
