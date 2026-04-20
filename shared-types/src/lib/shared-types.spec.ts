import { 
  SystemMetrics,
  SystemStatus,
  TelemetryPayload, 
} from './shared-types';

describe('sharedTypes', () => {
  it('should construct a valid TelemetryPayload', () => {
    const status: SystemStatus = 'healthy';
    const metrics: SystemMetrics = {
      timestamp: Date.now(),
      cpuUsage: 42,
      memoryUsage: 512,
      activeConnections: 3,
      status,
    };
    const payload: TelemetryPayload = { nodeId: 'node-1', metrics };

    expect(payload.nodeId).toBe('node-1');
    expect(payload.metrics.status).toBe('healthy');
   });
});
