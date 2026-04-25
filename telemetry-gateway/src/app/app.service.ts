import { Injectable } from '@nestjs/common';
import { SystemMetrics, SystemStatus } from '@realtime-telemetry-engine/shared-types';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  
  public streamMetrics(intervalMs: number = 5000): Observable<SystemMetrics> {
    return timer(0, intervalMs).pipe(
      map(() => this.generateMockMetrics())
    );
  }

  public generateMockMetrics(): SystemMetrics {
    const cpuUsage = this.getRandomNumber(10, 95);
    const memoryUsage = this.getRandomNumber(512, 8192);
    const activeConnections = this.getRandomNumber(100, 5000);
    
    return {
      timestamp: Date.now(),
      cpuUsage,
      memoryUsage,
      activeConnections,
      status: this.calculateStatus(cpuUsage, memoryUsage),
    };
  }

  private calculateStatus(cpu: number, memory: number): SystemStatus {
    if (cpu > 90 || memory > 7500) return 'critical';
    if (cpu > 75 || memory > 6000) return 'degraded';
    return 'healthy';
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
