import { Router } from 'express';

import { CreatePizzaController } from '../../../modules/Pizza/useCases/create/createPizza.controller';
import { ListOrderController } from '../../../modules/Order/useCases/create/order.controller';

const pizzaRouter = Router();

const createPizzaController = new CreatePizzaController();
const listOrderController = new ListOrderController();
/**
 * @swagger
 * /pizza/create:
 *   post:
 *     summary: Cria uma nova pizza
 *     tags: [Pizza]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size:
 *                 type: string
 *                 example: large
 *               flavor:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "calabresa" ]
 *               customizations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "extra bacon" ]
 *     responses:
 *       201:
 *         description: Pizza criada com sucesso
 *       400:
 *         description: Erro na criação da pizza
 */
pizzaRouter.post('/create', createPizzaController.handle.bind(createPizzaController));

/**
 * @swagger
 * /pizza/{id}:
 *   get:
 *     summary: Lista o pedido pelo ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido retornado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
pizzaRouter.get('/:id', listOrderController.handle.bind(listOrderController));



export { pizzaRouter };
