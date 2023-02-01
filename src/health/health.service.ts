import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth() {
    return {
      uptime: process.uptime(),
      timestamp: Date.now(),
      ok: true,
    };
  }
}
