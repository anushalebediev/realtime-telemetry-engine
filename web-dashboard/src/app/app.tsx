import { useGatewayConnect } from './gatewayconnect';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { CpuChart } from './components/CpuChart';

export function App() {
  const { metrics, metricsHistory, isConnected } = useGatewayConnect();

  if (!metrics) {
    return <p>Waiting for telemetry data...</p>;
  }

  // helper function to color-code the status
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'healthy': return 'green';
      case 'degraded': return 'orange';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <Header isConnected={isConnected} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <MetricCard title="CPU Usage" value={`${metrics.cpuUsage}%`} />
        <MetricCard title="Memory" value={`${metrics.memoryUsage} MB`} />
        <MetricCard title="Active Connections" value={metrics.activeConnections} />
        <MetricCard 
          title="System Status" 
          value={metrics.status.toUpperCase()} 
          valueColor={getStatusColor(metrics.status)} 
        />
      </div>

      <CpuChart data={metricsHistory} />
    </div>
  );
}

export default App;
