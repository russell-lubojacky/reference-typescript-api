import request from 'supertest';
import app from '../index';

describe('Index', () => {
    it('should respond with a 404 for non-existent routes', async () => {
        const response = await request(app).get('/nonexistentroute');

        expect(response.status).toBe(404);
    });
});