import express from 'express';

const app = express();

app.get('/api/public-route', (req, res) => {
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});

export default app;
