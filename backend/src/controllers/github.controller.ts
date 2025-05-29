import type { Request, Response, NextFunction } from 'express';
import { GitHubService } from '../services/github.service';
import type { CreateRepoParams } from '../types/github.types';

export class GitHubController {
  constructor(private githubService: GitHubService) {}

  async createRepository(req: Request<{}, {}, CreateRepoParams>, res: Response, next: NextFunction) {
    console.log('Creating repository with params:', req.body);
    try {
      const result = await this.githubService.createRepository(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }

      res.status(201).json({
        success: true,
        data: result.data
      });
    } catch (error: any) {
      console.error('Error in createRepository:', error);
      // Handle GitHub API errors
      if (error?.response?.data) {
        return res.status(400).json({
          success: false,
          error: error.response.data.message || 'GitHub API error',
          details: error.response.data
        });
      }
      // Handle other errors
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error'
      });
    }
  }
}
