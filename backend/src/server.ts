import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { githubRouter } from './routes/github.routes';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3002);

// Global middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/github', githubRouter);

// API Routes
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Express server
app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});
