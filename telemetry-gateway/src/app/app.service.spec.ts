import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { describe, beforeEach, it, expect } from 'vitest';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateMockMetrics', () => {
    it('should generate metrics within the expected boundaries', () => {
      const metrics = service.generateMockMetrics();

      // checking metric structure
      expect(metrics).toHaveProperty('timestamp');
      expect(metrics).toHaveProperty('cpuUsage');
      expect(metrics).toHaveProperty('memoryUsage');
      expect(metrics).toHaveProperty('activeConnections');
      expect(metrics).toHaveProperty('status');

      // checking ranges based on the random number generator logic
      expect(metrics.cpuUsage).toBeGreaterThanOrEqual(10);
      expect(metrics.cpuUsage).toBeLessThanOrEqual(95);
      
      expect(metrics.memoryUsage).toBeGreaterThanOrEqual(512);
      expect(metrics.memoryUsage).toBeLessThanOrEqual(8192);

      // status should map to the defined union type
      expect(['healthy', 'degraded', 'critical']).toContain(metrics.status);
    });
  });

  describe('streamMetrics', () => {
    it('should emit a valid metric payload via RxJS stream', async () => {
      // passing 1ms here instead of the default 1000ms so the test runs instantly.
      // pipe(take(1)) to automatically unsubscribe after the first emission.
      const stream$ = service.streamMetrics(1).pipe(take(1));
      
      // firstValueFrom converts the Observable into a Promise we can easily await
      const metricEmission = await firstValueFrom(stream$);

      expect(metricEmission).toBeDefined();
      expect(metricEmission).toHaveProperty('timestamp');
      expect(metricEmission).toHaveProperty('status');
    });
  });
});
