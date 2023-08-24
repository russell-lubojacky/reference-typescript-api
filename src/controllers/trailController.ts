import { Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import TrailsRepository from '../repository/TrailRepository';
import { CreateTrailRequest } from '../interfaces/requests/CreateTrailRequest';
import { validateCreateTrailRequest } from '../services/validationService';

const getAllTrails = async (req: Request, res: Response) => {
    try {
        const trails = await TrailsRepository.getAllTrails({ order: ['id']});
        res.status(200).json(trails);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getTrailById = async (req: Request, res: Response) => {
    try {
        if (uuidValidate(req.params.id)) {
            const trail = await TrailsRepository.getTrailByID(req.params.id);
            if (trail) {
                res.status(200).json(trail);
            } else {
                res.status(404).json({ message: `Trail not found: ${req.params.id}`});
            }
        } else {
            res.status(400).json({
                error: `ID is not a valid UUID: ${req.params.id}`
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createTrail = async (req: Request, res: Response) => {
    const requestData: CreateTrailRequest = req.body;

    const validationError = validateCreateTrailRequest(requestData);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const newTrail = await TrailsRepository.createTrail(requestData);
        
        res.status(201).json(newTrail);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteTrail = async (req: Request, res: Response) => {
    try {
        if (uuidValidate(req.params.id)) {
            const result = await TrailsRepository.deleteTrail(req.params.id);
            res.status(200).json(result);
        } else {
            res.status(400).json({
                error: `ID is not a valid UUID: ${req.params.id}`
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { getAllTrails, getTrailById, createTrail, deleteTrail }