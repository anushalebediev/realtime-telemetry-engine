import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { SystemMetrics } from '@realtime-telemetry-engine/shared-types';

interface CpuChartProps {
  data: SystemMetrics[];
}

export function CpuChart({ data }: CpuChartProps) {
  // helper to format the Unix timestamp into a readable HH:MM:SS format
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour12: false });
  };

  return (
    <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333' }}>CPU Utilization History</h2>
      <div style={{ height: '400px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line 
              type="monotone" 
              dataKey="cpuUsage" 
              stroke="#2563eb" 
              strokeWidth={3}
              isAnimationActive={false} // Keeps the 5s tick clean without jittering
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
  );
}
