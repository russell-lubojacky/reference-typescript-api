import Joi from 'joi';
import { CreateTrailRequest } from '../interfaces/requests/CreateTrailRequest'

const validateCreateTrailRequest = (data: CreateTrailRequest): string | null => {
    const schema = Joi.object().keys({
        name: Joi.string().trim().required(),
        difficulty: Joi.string().trim().required(),
        length: Joi.number()
    });

    const { error } = schema.validate(data);
    if (error) {
        return error.details[0].message;
    }

    return null;
};

export { validateCreateTrailRequest };