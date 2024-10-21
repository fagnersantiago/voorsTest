import { Router } from 'express';

import { pizzaRouter} from './pizza.routes';

const router = Router();
/**
 * @swagger
 * /pizza/create:
 *   post:
 *     summary: Cria um pedido de pizza
 *     description: Cria um novo pedido de pizza com as especificações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pizzas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                       example: large
 *                     flavor:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["calabresa"]
 *                     customizations:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["extra bacon", "borda recheada"]
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *       400:
 *         description: Erro ao criar pedido
 */


router.use('/pizza', pizzaRouter);


export { router };
