import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SystemMetrics } from '@realtime-telemetry-engine/shared-types';

const GATEWAY_URL = 'http://localhost:3000';

export const gatewayConnect = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
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
    });

    // 4. Cleanup function: disconnect when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  return { metrics, isConnected };
};
