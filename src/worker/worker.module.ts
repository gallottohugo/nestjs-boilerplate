import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigurationModule } from '../configuration/configuration.module';
import { CronProducerModule } from 'src/worker/producer/cron-producer.module';
import { BullConfigModule } from './bull-config/bull-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatadogTraceModule } from 'nestjs-ddtrace';

@Module({
  imports: [
    ConfigurationModule,
    LoggerModule.forRoot(),
    DatadogTraceModule.forRoot(),
    BullConfigModule,
    CronProducerModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await ConfigModule.envVariablesLoaded;
        const { typeOrmModuleOptions } = await import('./../ormconfig');
        return typeOrmModuleOptions;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class WorkerModule {}
