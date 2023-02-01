import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHealth', () => {
    it('should be defined', () => {
      const health = controller.getHealth();
      jest.spyOn(service, 'getHealth').mockImplementation(() => ({
        timestamp: 1663094781845,
        uptime: 100,
        ok: true,
      }));

      expect(health).toHaveProperty('message');
      expect(health).toHaveProperty('timestamp');
      expect(health).toHaveProperty('uptime');
      expect(health.message).toEqual('OK - Healthy');
    });
  });
});
