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
 *                 example: "large"
 *               flavor:
 *                 type: string
 *                 example: "calabresa"
 *               customizations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "extra bacon" ]
 *     responses:
 *       201:
 *         description: Pizza criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "pizzaId"
 *                 size:
 *                   type: string
 *                   example: "large"
 *                 flavor:
 *                   type: string
 *                   example: "calabresa"
 *                 customizations:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [ "extra bacon" ]
 *                 preparationTime:
 *                   type: integer
 *                   example: 20
 *                 value:
 *                   type: number
 *                   example: 30.00
 *       400:
 *         description: Erro to create pizza
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "invalid Size!"
 */
pizzaRouter.post('/create', createPizzaController.handle.bind(createPizzaController));

/**
 * @swagger
 * /pizza/list-order/{id}:
 *   get:
 *     summary: Lista o pedido pelo ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listedOrder:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "90ebb280-3c25-47bb-b3e2-fca5c905ae75"
 *                       totalValue:
 *                         type: number
 *                         example: 48
 *                       totalTime:
 *                         type: integer
 *                         example: 30
 *                       pizzas:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "0adcd25b-9fa6-4119-842e-30e06c3d51ac"
 *                             size:
 *                               type: string
 *                               example: "large"
 *                             flavor:
 *                               type: string
 *                               example: "portuguesa"
 *                             customizations:
 *                               type: array
 *                               items:
 *                                 type: string
 *                               example: [ "extra bacon", "borda recheada" ]
 *                             preparationTime:
 *                               type: integer
 *                               example: 30
 *                             value:
 *                               type: number
 *                               example: 48
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order not exists"
 */

pizzaRouter.get('/list-order/:id', listOrderController.handle.bind(listOrderController));

export { pizzaRouter };
