import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './app';
import * as GatewayConnect from './gatewayconnect';

// mock Recharts to prevent SVG rendering errors in JSDOM
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="recharts-container">{children}</div>,
  LineChart: ({ children }: any) => <div>{children}</div>,
  Line: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
}));

describe('Dashboard App Component', () => {
  it('should render the disconnected and loading state initially', () => {
    // force the hook to simulate a disconnected state without data
    vi.spyOn(GatewayConnect, 'useGatewayConnect').mockReturnValue({
      metrics: null, 
      metricsHistory: [],
      isConnected: false,
    });

    render(<App />);
    
    // with no metrics, the early return renders only the loading message (no Header)
    expect(screen.getByText('Waiting for telemetry data...')).toBeTruthy();
  });

  it('should render the metrics dashboard when data is actively flowing', () => {
    // force the hook to simulate a live, connected state with mock data
    vi.spyOn(GatewayConnect, 'useGatewayConnect').mockReturnValue({
      metrics: {
        timestamp: 1713990626000,
        cpuUsage: 42,
        memoryUsage: 2048,
        activeConnections: 1500,
        status: 'healthy',
      },
      metricsHistory: [
        { timestamp: 1713990626000, cpuUsage: 42, memoryUsage: 2048, activeConnections: 1500, status: 'healthy' }
      ],
      isConnected: true,
    });

    render(<App />);
    
    expect(screen.getByText('Live Connection Active')).toBeTruthy();
    expect(screen.getByText('42%')).toBeTruthy();
    expect(screen.getByText('2048 MB')).toBeTruthy();
    // the UI uses textTransform: 'uppercase' but the raw DOM text is 'healthy'
    expect(screen.getByText('healthy')).toBeTruthy();
    expect(screen.getByTestId('recharts-container')).toBeTruthy(); 
  });
});
