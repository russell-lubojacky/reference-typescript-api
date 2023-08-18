import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbUrl: string = process.env.DB_URL || '';
const nodeEnv: string = process.env.NODE_ENV || '';

if (!dbUrl) {
    console.log('Please create .env file, refer .env.sample');
    process.exit(0);
}

const sequelize: Sequelize = new Sequelize(dbUrl);

export default sequelize;
