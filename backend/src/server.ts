import express from 'express';
const app = express();
const PORT = 8080;

import cors from 'cors';
const corsOptions = {
    origin: ['http://localhost:5173']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.send('Hello from express backend!');
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
