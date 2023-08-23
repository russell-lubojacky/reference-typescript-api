import express from 'express';
import request from 'supertest';
import trailRouter from '../routes/trailRouter';
import Trail from '../models/Trail';

jest.mock('../models/Trail');
const mockedTrail = (Trail as unknown) as jest.Mocked<typeof Trail> & {
    create: jest.Mock;
    findAll: jest.Mock;
    findByPk: jest.Mock;
    destroy: jest.Mock; 
}
mockedTrail.create = jest.fn();
mockedTrail.findAll = jest.fn();
mockedTrail.findByPk = jest.fn();
mockedTrail.destroy = jest.fn();

const app = express();
app.use(express.json());
app.use('/api/trails', trailRouter);

describe('trailRouter', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /api/trails', () => {
        it('response with a 201 and creates a new trail', async () => {
            const trailData = {
                name: 'Big Bend',
                difficulty: 'Hard',
                length: '18'
            };

            mockedTrail.create.mockResolvedValueOnce({
                id: 1,
                ...trailData
            });

            const response = await request(app)
                .post('/api/trails')
                .send(trailData);

            expect(response.status).toBe(201);
            expect(response.body.name).toEqual('Big Bend');
            expect(response.body.difficulty).toEqual('Hard');
            expect(Trail.create).toHaveBeenCalledWith(trailData);
        });
        it('response with a 500 and returns an error message', async () => {
            const trailData = {
                name: 'Big Bend',
                difficulty: 'Hard',
                length: '18'
            };
            const errorResponse = { 
                error: 'Internal server error' 
            };

            mockedTrail.create.mockRejectedValueOnce(new Error('Some error message'));

            const response = await request(app)
                .post('/api/trails')
                .send(trailData);

            expect(response.status).toBe(500);
            expect(response.body).toEqual(errorResponse);
        });
        it('response with a 400 with a validation error', async () => {
            const trailData = {
                name: 42,
                difficulty: 'Hard',
                length: '18'
            };
            const errorResponse = { 
                error: '"name" must be a string' 
            };

            mockedTrail.create.mockResolvedValueOnce({
                id: 1,
                ...trailData
            });

            const response = await request(app)
                .post('/api/trails')
                .send(trailData);

            expect(response.status).toBe(400);
            expect(response.body).toEqual(errorResponse);
        });
    })

    describe('GET /api/trails', () => {
        const trailData = [
            {
                id: '2a3fd1b2-5897-4818-9af9-574f2fe69c93',
                name: 'Trail 2',
                difficulty: 'Difficult',
                length: '18'
            },
            {
                id: '407c55af-d71d-46b4-b06b-d26306c602f6',
                name: 'Trail 1',
                difficulty: 'Difficult',
                length: '18'
            }
        ];

        it('response with a 200 and returns a list of trails', async () => {
            mockedTrail.findAll.mockResolvedValueOnce(trailData);

            const response = await request(app)
                .get('/api/trails');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(trailData);
        });
        it('response with a 500 and returns an error message', async () => {
            const errorResponse = { 
                error: 'Internal server error' 
            };

            mockedTrail.findAll.mockRejectedValueOnce(new Error('Some error message'));

            const response = await request(app)
                .get('/api/trails');

            expect(response.status).toBe(500);
            expect(response.body).toEqual(errorResponse);
        });
    });

    describe('GET /api/trails/:id', () => {
        const trailData = {
            id: '2a3fd1b2-5897-4818-9af9-574f2fe69c93',
            name: 'Trail 2',
            difficulty: 'Difficult',
            length: '18'
        };

        it('response with a 200 and returns one trail based on ID', async () => {
            mockedTrail.findByPk.mockResolvedValueOnce(trailData);

            const response = await request(app)
                .get(`/api/trails/${trailData.id}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(trailData);
        });
        it('response with a 500 and returns an error message', async () => {
            const errorResponse = { 
                error: 'Internal server error' 
            };

            mockedTrail.findByPk.mockRejectedValueOnce(new Error('Some error message'));

            const response = await request(app)
                .get(`/api/trails/${trailData.id}`);

            expect(response.status).toBe(500);
            expect(response.body).toEqual(errorResponse);
        });
        it('response with a 400 and returns an error messaging indicating invalid UUID', async () => {
            const id = 1;
            const errorResponse = { 
                error: `ID is not a valid UUID: ${id}` 
            };

            mockedTrail.findByPk.mockRejectedValueOnce(new Error('Some error message'));

            const response = await request(app)
                .get(`/api/trails/${id}`);

            expect(response.status).toBe(400);
            expect(response.body).toEqual(errorResponse);
        });
    });
    describe('DELETE /api/trails/:id', () => {
        it('response with a 200', async () => {
            const response = await request(app)
                .delete(`/api/trails/2a3fd1b2-5897-4818-9af9-574f2fe69c93`);
            expect(response.status).toBe(200);
        });
        it('response with a 500 and returns an error message', async () => {
            const errorResponse = { 
                error: 'Internal server error' 
            };

            mockedTrail.destroy.mockRejectedValueOnce(new Error('Some error message'));

            const response = await request(app)
                .delete('/api/trails/2a3fd1b2-5897-4818-9af9-574f2fe69c93');

            expect(response.status).toBe(500);
            expect(response.body).toEqual(errorResponse);
        });
        it('response with a 400 and returns an error messaging indicating invalid UUID', async () => {
            const id = 1;
            const errorResponse = { 
                error: `ID is not a valid UUID: ${id}` 
            };

            mockedTrail.findByPk.mockRejectedValueOnce(new Error('Some error message'));

            const response = await request(app)
                .delete(`/api/trails/${id}`);

            expect(response.status).toBe(400);
            expect(response.body).toEqual(errorResponse);
        });
    });
});