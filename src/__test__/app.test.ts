import request from 'supertest';
import app from './../app'; 

describe('API Public Route', () => {
  it('responds with a greeting message from the public endpoint', async () => {
    const response = await request(app).get('/api/public-route');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });
});
