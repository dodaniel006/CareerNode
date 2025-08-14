import express from 'express';
import 'dotenv/config';
const app = express();
const PORT = 8080;

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://CareerNodeAdmin:${process.env.DB_PASSWORD}@careernode.xwjdhbh.mongodb.net/?retryWrites=true&w=majority&appName=CareerNode`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

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
