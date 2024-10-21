import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { ListOrderUseCase } from './order.useCase';

class ListOrderController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { id } = req.params;

    try {
      const listOrderUseCase = container.resolve(ListOrderUseCase);

      const listedOrder = await listOrderUseCase.execute({ id });

      return res.status(201).json({listedOrder});
    } catch (err) {
      console.log( err.message)
      next(err)
    }
  }
}

export { ListOrderController };
