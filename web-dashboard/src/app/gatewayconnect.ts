import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SystemMetrics } from '@realtime-telemetry-engine/shared-types';

const GATEWAY_URL = 'http://localhost:3000';
const MAX_DATA_POINTS = 20;

export const useGatewayConnect = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [metricsHistory, setMetricsHistory] = useState<SystemMetrics[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // 1. Initialize the socket connection
    const socket: Socket = io(GATEWAY_URL);

    // 2. Set up event listeners
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to Telemetry Gateway');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from Telemetry Gateway');
    });

    // 3. Listen for our specific telemetry payload
    socket.on('telemetry_update', (data: SystemMetrics) => {
      setMetrics(data);

      setMetricsHistory((prev) => {
        const updatedHistory = [...prev, data];
        if (updatedHistory.length > MAX_DATA_POINTS) {
          return updatedHistory.slice(updatedHistory.length - MAX_DATA_POINTS);
        }
        return updatedHistory;
      });
    });

    // 4. Cleanup function: disconnect when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  return { metrics, metricsHistory, isConnected };
};
