import { useGatewayConnect } from './gatewayconnect';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export function App() {
  const { metrics, metricsHistory, isConnected } = useGatewayConnect();

  // Helper function to color-code the status
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'healthy': return 'green';
      case 'degraded': return 'orange';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour12: false });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1>Real-Time Telemetry Engine</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: isConnected ? 'green' : 'red' 
            }} 
          />
          <span>{isConnected ? 'Live Connection Active' : 'Disconnected'}</span>
        </div>
      </header>

      {!metrics ? (
        <p>Waiting for telemetry data...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>CPU Usage</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{metrics.cpuUsage}%</p>
            </div>
            <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Memory</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{metrics.memoryUsage} MB</p>
            </div>
            <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Active Connections</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{metrics.activeConnections}</p>
            </div>
            <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>System Status</h3>
              <p style={{ 
                fontSize: '1.5rem', 
                margin: 0, 
                fontWeight: 'bold',
                color: getStatusColor(metrics.status),
                textTransform: 'uppercase'
              }}>
                {metrics.status}
              </p>
            </div>
          </div>

          <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333' }}>CPU Utilization History</h2>
            <div style={{ height: '400px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metricsHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line 
                    type="monotone" 
                    dataKey="cpuUsage" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    isAnimationActive={false} 
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={formatTime} 
                    minTickGap={20}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    labelFormatter={(label) => `Time: ${formatTime(label as number)}`}
                    formatter={(value) => [`${value}%`, 'CPU Usage']}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
