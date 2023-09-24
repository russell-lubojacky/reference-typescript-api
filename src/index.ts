import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import jwt from 'jsonwebtoken';

import trailRoutes from './routes/trailRouter';
import sequelize from './db/config';
import './middleware/auth'

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Trails API',
            version: '1.0.0',
            description: 'API documentation for the Trails application'
        },
        servers: [
            {
                url: 'http://localhost:3000/api'
            }
        ]
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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