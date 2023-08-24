import { Trail } from '../models/Trail';
import { CreateTrailRequest } from '../interfaces/requests/CreateTrailRequest';

class TrailRepository {
    getAllTrails(options) {
        return Trail.findAll(options);
    }

    async getTrailByID(id: string): Promise<Trail | null> {
        return await Trail.findByPk(id);
    }

    async createTrail(trailData: CreateTrailRequest): Promise<Trail> {
        return await Trail.create({
            name: trailData.name,
            difficulty: trailData.difficulty,
            length: trailData.length
        });
    }

    deleteTrail(id: string) {
        return Trail.destroy({ where: {id: id.toString() }});
    }
}

export default new TrailRepository();