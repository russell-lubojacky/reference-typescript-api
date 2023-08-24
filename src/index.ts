import express from 'express';
import cors from 'cors';
import trailRoutes from './routes/trailRouter';
import sequelize from './db/config';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const splunkToken: string = process.env.SPLUNK_TOKEN || '';
const splunkUrl: string = process.env.SPLUNK_URL || '';

if (!splunkToken || !splunkUrl) {
    console.log('Please create .env file with SPLUNK_TOKEN and SPLUNK_URL defined.');
    process.exit(0);
}

const SplunkLogger = require('splunk-logging').Logger;
const config = {
    token: splunkToken,
    url: splunkUrl,
    source: 'Trails API'
}
const Logger = new SplunkLogger(config);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
    const payload = {
        message: `${req.method} ${req.url}`,
        meta: {
            user_agent: req.headers['user-agent'],
            ip: req.ip,
            body: req.body,
        }
    };
    Logger.send(payload, (err, resp, body) => {
        console.log('Sending to splunk.');
        if (err) console.error("Error sending data to Splunk:", err);
    })
    next();
});
app.use('/api/trails', trailRoutes);

if (require.main === module) {
    sequelize.sync().then(() => {   
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    });
}

export default app;