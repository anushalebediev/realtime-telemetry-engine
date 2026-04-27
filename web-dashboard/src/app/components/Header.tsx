interface HeaderProps {
  isConnected: boolean;
}

export function Header({ isConnected }: HeaderProps) {
  return (
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
  );
}
