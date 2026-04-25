import { gatewayConnect } from './gatewayconnect';

export function App() {
  const { metrics, isConnected } = gatewayConnect();

  // Helper function to color-code the status
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          
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
      )}
    </div>
  );
}

export default App;
