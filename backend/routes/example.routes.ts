import express from 'express';
import { ExampleController } from '../controllers/example.controller';
import { ExampleService } from '../services/example.service';

const router = express.Router();
const exampleService = new ExampleService();
const exampleController = new ExampleController(exampleService);

// Routes
router.get('/all', (req, res, next) => exampleController.getAll(req, res, next));
router.post('/create', (req, res, next) => exampleController.create(req, res, next));
router.get('/:id', exampleController.getById);
router.delete('/:id', exampleController.deleteById);
router.put('/:id', exampleController.updateById);

export { router as exampleRouter };
