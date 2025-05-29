import { Request, Response, NextFunction } from 'express';
import { ExampleService } from '../services/example.service';

export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.exampleService.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.exampleService.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const data = await this.exampleService.getById(id);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
    async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const data = await this.exampleService.updateById(id, req.body);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const data = await this.exampleService.deleteById(id);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}
