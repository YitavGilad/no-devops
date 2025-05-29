import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateCreateRepo = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Repository name is required')
    .matches(/^[a-zA-Z0-9-_]+$/)
    .withMessage('Repository name can only contain letters, numbers, hyphens, and underscores'),
  
  body('language')
    .trim()
    .notEmpty()
    .withMessage('Programming language is required')
    .isIn(['javascript', 'python', 'java'])
    .withMessage('Invalid programming language'),
  
  body('framework')
    .trim()
    .notEmpty()
    .withMessage('Framework is required'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  
  body('private')
    .optional()
    .isBoolean()
    .withMessage('Private must be a boolean value'),

  // Validation result handler
  (req: Request, res: Response, next: NextFunction) => {
    console.log('Received request body:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];
