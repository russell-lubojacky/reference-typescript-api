import express from 'express';
import request from 'supertest';
import trailRouter from '../routes/trailRouter'
import { createTrail, getAllTrails, getTrailById, deleteTrail } from '../controllers/trailController'
import TrailRepository from '../repository/TrailRepository';

jest.mock('../controllers/trailController', () => ({
    createTrail: jest.fn(),
    getAllTrails: jest.fn(),
    getTrailById: jest.fn(),
    deleteTrail: jest.fn(),
}));

jest.mock('../repository/TrailRepository', () => ({
    createTrail: jest.fn(),
    getAllTrails: jest.fn(),
    getTrailById: jest.fn(),
    deleteTrail: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/api/trails', trailRouter);

describe('trailRouter', () => {
    describe('POST /api/trails', () => {
        it('response with a 201 and creates a new trail', async () => {
            (TrailRepository.createTrail as jest.Mock).mockResolvedValue({
                id: '9b20ffb6-2c1b-4678-887e-c419ba809968',
                name: 'Big Bend',
                difficulty: 'Hard',
                length: '18'
            });

            const trailData = {
                name: 'Big Bend',
                difficulty: 'Hard',
                length: '18'
            };

            (createTrail as jest.Mock).mockImplementation((req, res) => {
                res.status(201).json(trailData);
            });

            const response = await request(app).post('/api/trails').send(trailData);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(trailData);
        });
    })
});