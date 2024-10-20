import { Router } from 'express';

import { CreatePizzaController } from '../../../modules/Pizza/useCases/create/createPizza.controller';

const pizzaRouter = Router();

const createPizzaController = new CreatePizzaController();

pizzaRouter.post('/create', createPizzaController.handle.bind(createPizzaController));


export { pizzaRouter };
