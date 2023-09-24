import express, { Request, Response, NextFunction } from 'express';
import { getAllTrails, createTrail, getTrailById, deleteTrail } from '../controllers/trailController';
import jwt from 'jsonwebtoken';

const trailRouter = express.Router();
const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0hN5ZatavBEd1fkVpF1bBnZIne7pVBQaQ4s+insX1OwCKzAZfjMoKMmMTGkZFTp0b0RTiIQXQ/eIdL1+v+Yjp/Flb9TezDaqw1cgUpCvDPqjuOJ68crC3kvNFTj5UE0WBLvvOPMSHH6D05ClhEEgxgO7tZQj5FKUhATg4FFqwpsjrbxj1PDyoey8hz08/T4LtLFTQbSLHhv7KZiKKTeIoO9qPQhUpXP4qTs2rLjV7yN8kCbJYAiP9FjnhkpkdwR2FmDzujhTcB+OGFHLZOHGAsd8Kt80EnGT1U5CNwYZhUB5FSXu71GfYHBdwL1lz8+9BfnJgn3LNW0tZw/dlQxtBQIDAQAB
-----END PUBLIC KEY-----
`;

const DELETE_TRAIL_ROLE = 'delete-trail';

function verifyJWTAndRole(requiredRole: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided.' });
        }

        try {
            const user: any = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });

            const hasRole = user.realm_access?.roles.includes(requiredRole);
            if (!hasRole) {
                return res.status(403).json({ message: 'Forbidden: User does not have the necessary role.' });
            }

            (req as any).user = user;
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token.'})
        }
    };
}

/**
 * @swagger
 * components:
 *  schemas:
 *      Trail:
 *          type: object
 *          required: 
 *              - name
 *              - difficulty
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto-generated id of the trail
 *              name:
 *                  type: string
 *                  description: The name of the trail
 *              difficulty:
 *                  type: string
 *                  description: The difficulty of the trail
 *              length:
 *                  type: number
 *                  description: The length of the trail
 *          example:
 *              id: 1
 *              name: 'Forest Trail'
 *              difficulty: 'Hard'
 *              length: 10
 */

/**
 * @swagger
 * /trails:
 *  get:
 *      summary: Retrieve a list of trails
 *      tags: [Trails]
 *      responses:
 *          200:
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Trail'
 */
trailRouter.get('/', getAllTrails);

/**
 * @swagger
 * /trails:
 *  post:
 *      summary: Creates a new trail
 *      tags: [Trails]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/Trail' 
 *      responses:
 *          201:
 *              description: A successful response
 */
trailRouter.post('/', createTrail);

/**
 * @swagger
 * /trails/{id}:
 *  get:
 *      summary: Retrieve a specific trail by its ID
 *      tags: [Trails]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID of the trail
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Trail'
 */
trailRouter.get('/:id', getTrailById);

/**
 * @swagger
 * /trails:
 *  delete:
 *      summary: Deletes a trail
 *      tags: [Trails]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID of the trail
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: A successful response
 */
trailRouter.delete('/:id', verifyJWTAndRole(DELETE_TRAIL_ROLE), deleteTrail);

export default trailRouter;