import { Router } from 'express';

import { pizzaRouter} from './pizza.routes';

const router = Router();

router.use('/pizza', pizzaRouter);


export { router };
