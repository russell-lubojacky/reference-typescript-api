import express from 'express';
import { getAllTrails, createTrail, getTrailById, deleteTrail } from '../controllers/trailController';

const trailRouter = express.Router();

trailRouter.get('/', getAllTrails);
trailRouter.post('/', createTrail);
trailRouter.get('/:id', getTrailById);
trailRouter.delete('/:id', deleteTrail)

export default trailRouter;