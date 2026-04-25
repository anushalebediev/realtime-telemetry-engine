import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './app';
import * as GatewayConnect from './gatewayconnect';

describe('Dashboard App Component', () => {
  it('should render the disconnected and loading state initially', () => {
    // force the hook to simulate a disconnected state without data
    vi.spyOn(GatewayConnect, 'useGatewayConnect').mockReturnValue({
      metrics: null, 
      isConnected: false,
    });

    render(<App />);
    
    expect(screen.getByText('Real-Time Telemetry Engine')).toBeTruthy();
    expect(screen.getByText('Disconnected')).toBeTruthy();
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
      isConnected: true,
    });

    render(<App />);
    
    expect(screen.getByText('Live Connection Active')).toBeTruthy();
    expect(screen.getByText('42%')).toBeTruthy();
    expect(screen.getByText('2048 MB')).toBeTruthy();
    // the UI uses textTransform: 'uppercase' but the raw DOM text is 'healthy'
    expect(screen.getByText('healthy')).toBeTruthy(); 
  });
});
