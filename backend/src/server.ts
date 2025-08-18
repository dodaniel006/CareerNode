import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Environment variables
const PORT = 8080;
const saltRounds = 10;
const uri = process.env.MONGODB_URI!;

// Express app setup
const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173']
}));
app.use(express.json());

// MongoDB client setup
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

// Connect once at startup
await client.connect();

const db = client.db('careernode');

// Routes
app.get('/api/hello', (req, res) => {
    res.send('Hello from express backend!');
});

app.get('/api/test', async (req, res) => {
    try {
        const users = await db.collection('users').find({}).toArray();
        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await db.collection('users').insertOne({ email, password: hashedPassword });
        res.status(201).json({ id: result.insertedId, email });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
