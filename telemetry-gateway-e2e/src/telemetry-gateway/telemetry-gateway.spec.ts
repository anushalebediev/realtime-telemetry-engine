import axios from 'axios';

describe('GET /api', () => {
  it('should return a valid system metrics payload', async () => {
    const res = await axios.get(`/api`);

    // verify the endpoint successfully responds
    expect(res.status).toBe(200);

    // verify the exact structure of the contract
    expect(res.data).toHaveProperty('timestamp');
    expect(res.data).toHaveProperty('cpuUsage');
    expect(res.data).toHaveProperty('memoryUsage');
    expect(res.data).toHaveProperty('activeConnections');
    expect(res.data).toHaveProperty('status');

    // verify the types/ranges of the dynamic data
    expect(typeof res.data.timestamp).toBe('number');
    expect(res.data.cpuUsage).toBeGreaterThanOrEqual(10);
    expect(res.data.cpuUsage).toBeLessThanOrEqual(95);
    
    // verify the union type for status
    expect(['healthy', 'degraded', 'critical']).toContain(res.data.status);
  });
});
