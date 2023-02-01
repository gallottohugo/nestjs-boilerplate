import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth() {
    const { uptime, timestamp } = this.healthService.getHealth();

    return {
      uptime,
      timestamp,
      message: 'OK - Healthy',
    };
  }
}
