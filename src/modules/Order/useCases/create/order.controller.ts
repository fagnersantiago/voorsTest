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

      const listedOrder  = await listOrderUseCase.execute({ id });
      
      const order = listedOrder[0];
      
      const formattedOrder = {
        id: order.id,
        totalValue: order.totalValue,
        totalTime: order.totalTime,
        pizzas: order.pizzas.map(pizza => ({
          size: pizza.size,
          flavor: pizza.flavor,
          customizations: pizza.customizations,
          preparationTime: pizza.preparationTime,
          value: pizza.value,
        })),
      };

      return res.status(200).json({ listedOrder: formattedOrder });
    } catch (err) {
      console.log( err.message)
      next(err)
    }
  }
}

export { ListOrderController };
