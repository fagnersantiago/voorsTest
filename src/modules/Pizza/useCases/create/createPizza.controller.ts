import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { CreatePizzaUseCase } from './createPizza.useCase';

 class CreatePizzaController {

  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { pizzas } = req.body;

    try {

      const createPizzaUsecase = container.resolve(
        CreatePizzaUseCase,
      );
      const pizza = await createPizzaUsecase.execute({ pizzas });

      return res.status(201).json(pizza);
    } catch (err) {
       next(err);
      return res.status(400).json({ message: err.message });
 
      }
    }
  }


export { CreatePizzaController}