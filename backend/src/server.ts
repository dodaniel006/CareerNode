import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import type { Request, Response, NextFunction } from 'express';

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

// Middleware
function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        // Attach userId to req (extend type if needed)
        (req as any).userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}

// Routes
app.get('/api/hello', (req, res) => {
    res.send('Hello from express backend!');
});

app.get('/api/me', authMiddleware, async (req, res) => {
    try {
        const userId = (req as any).userId;
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ email: user.email });
    } catch {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
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
        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await db.collection('users').insertOne({ email, password: hashedPassword });
        res.status(201).json({ id: result.insertedId, email });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id.toString(), email: user.email },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

app.get('/api/getPosts', authMiddleware, async (req, res) => {
    try {
        const userId = (req as any).userId;
        const posts = await db.collection('posts').find({ userId }).toArray();
        res.json(posts);
    } catch {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.post('/api/submitPost', authMiddleware, async (req, res) => {
    const { title, companyName, applicationDate, lastUpdatedDate, status } = req.body;

    try {
        const userId = (req as any).userId;
        const result = await db.collection('posts').insertOne({
            userId,
            title,
            companyName,
            applicationDate,
            lastUpdatedDate,
            status
        });
        res.status(201).json({
            _id: result.insertedId,
            userId,
            title,
            companyName,
            applicationDate,
            lastUpdatedDate,
            status,
        });
    } catch {
        res.status(500).json({ error: 'Failed to submit post' });
    }
});

app.delete('/api/deletePost/:id', authMiddleware, async (req, res) => {
    const postId = req.params.id;

    try {
        const userId = (req as any).userId;
        const result = await db.collection('posts').deleteOne({ _id: new ObjectId(postId), userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(204).send();
    } catch {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
