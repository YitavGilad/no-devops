import express, { Request, Response, NextFunction } from 'express';
import type { CreateRepoParams } from '../types/github.types';
import { GitHubController } from '../controllers/github.controller';
import { GitHubService } from '../services/github.service';
import { validateCreateRepo } from '../middleware/validation/github.validation';

const router = express.Router();

// Initialize GitHub service with environment variables
const githubService = new GitHubService(
  process.env.GITHUB_TOKEN || '',
  process.env.GITHUB_USERNAME || ''
);
const githubController = new GitHubController(githubService);

// Routes
router.post('/repository', validateCreateRepo, async (req: Request<{}, {}, CreateRepoParams>, res: Response, next: NextFunction) => {
  await githubController.createRepository(req, res, next);
});

export { router as githubRouter };
