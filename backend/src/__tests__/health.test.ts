import request from 'supertest';
import app from '../server';
import mongoose from 'mongoose';

describe('Health Check API', () => {
  // Close DB connection after tests to prevent Jest from hanging
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('uptime');
  });
});
