export type SystemStatus = 'healthy' | 'degraded' | 'critical';

export interface SystemMetrics {
  /** Unix timestamp of when the metric was recorded */
  timestamp: number;
  /** CPU utilization percentage (0-100) */
  cpuUsage: number;
  /** Active memory consumption in megabytes */
  memoryUsage: number;
  /** Current active WebSocket connections to the gateway */
  activeConnections: number;
  /** Overall health calculation based on thresholds */
  status: SystemStatus;
}

export interface TelemetryPayload {
  nodeId: string;
  metrics: SystemMetrics;
}
