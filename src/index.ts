import express from 'express';
import cors from 'cors';
import trailRoutes from './routes/trailRouter';
import sequelize from './db/config';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api/trails', trailRoutes);

if (require.main === module) {
    sequelize.sync().then(() => {   
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    });
}

export default app;