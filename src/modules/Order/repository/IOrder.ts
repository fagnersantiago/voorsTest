import { Order } from '../../Order/infra/prisma/entities/order';

interface IOrder {
  createOrder(totalValue: number, totalTime: number, pizzas: any[]);
  findById(orderId: string): Promise<Order | null>;
  listOrder(orderId: string[]): Promise<Order>;
}

export { IOrder };
