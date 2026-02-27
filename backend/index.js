import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { connect } from './src/db/mongo.js';
import assignmentsRouter from './src/routes/assignments.js';
import executeRouter from './src/routes/execute.js';
import hintsRouter from './src/routes/hints.js';
import attemptsRouter from './src/routes/attempts.js';
import errorHandler from './src/middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
//app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || origin.startsWith('http://localhost')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    })
  );
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please slow down.' },
});
app.use('/api', limiter);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/assignments', assignmentsRouter);
app.use('/api/execute', executeRouter);
app.use('/api/hints', hintsRouter);
app.use('/api/attempts', attemptsRouter);

app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

app.use(errorHandler);

const start = async () => {
  try {
      if (process.env.MONGO_URI) {
          await connect();
          console.log("MongoDB connected");
      } else {
          console.log("MongoDB not configured. Skipping connection.");
      }

      app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
      });
  } catch (err) {
      console.error("Startup error:", err.message);
      process.exit(1);
  }
};
start();
