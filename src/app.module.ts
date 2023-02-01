import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from './health/health.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatadogTraceModule } from 'nestjs-ddtrace';

@Module({
  imports: [
    HealthModule,
    LoggerModule.forRoot(),
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await ConfigModule.envVariablesLoaded;
        const { typeOrmModuleOptions } = await import('./ormconfig');
        return typeOrmModuleOptions;
      },
    }),
    DatadogTraceModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
