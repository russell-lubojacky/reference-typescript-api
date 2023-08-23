import sequelize from '../db/config';
import { Model, DataTypes } from 'sequelize';
import { UUID } from "crypto";

export class Trail extends Model {
    public id!: UUID;
    public name!: string;
    public difficulty!: string;
    public length!: number;
}

Trail.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        difficulty: { type: DataTypes.STRING },
        length: { type: DataTypes.INTEGER },
    },
    {
       sequelize,
       schema: 'trail',
       tableName: 'trail_core',
       timestamps: false
    }
)

export default Trail;