import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { MongoClient, ServerApiVersion } from 'mongodb';

// Environment variables
const PORT = 8080;
const uri = process.env.MONGODB_URI!;

// MongoDB client setup
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

// Express app setup
const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173']
}));
app.use(express.json());

// Routes
app.get('/api/hello', (req, res) => {
    res.send('Hello from express backend!');
});

app.get('/api/test', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('careernode');
        const users = await db.collection('users').find({}).toArray();
        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    } finally {
        await client.close();
    }
})

// Start server
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
