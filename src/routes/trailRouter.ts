import express from 'express';
import { getAllTrails, createTrail, getTrailById, deleteTrail } from '../controllers/trailController';

const trailRouter = express.Router();

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
trailRouter.delete('/:id', deleteTrail)

export default trailRouter;