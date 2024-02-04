import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connect } from './db/connect';
import taskRoute from './routes/task.route';
import { checkJwt } from './middleware/authMiddleware';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import app from './app';

const baseUrl = process.env.AUTH0_BASE_URL;

app.use(express.json());
app.use(cors({ origin: baseUrl }));
app.use(morgan('dev'));



app.get('/api/public-route', (req, res) => {
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});

app.use('/api', checkJwt, taskRoute)

const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const PORT = 5000;

const main = () => {
    try {
        connect()
        app.listen(PORT, () => {

            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to server:', error);
    }
}

main();

