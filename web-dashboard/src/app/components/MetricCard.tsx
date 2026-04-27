interface MetricCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
}

export function MetricCard({ title, value, valueColor = '#000' }: MetricCardProps) {
  return (
    <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{title}</h3>
      <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: valueColor }}>
        {value}
      </p>
    </div>
  );
}
