import 'reflect-metadata';
import { prisma } from '../infra/prisma';
import { Order } from '../infra/prisma/entities/order';
import { IOrder } from './IOrder';

class OrderRepository implements IOrder {
  async createOrder(totalValue: number, totalTime: number, pizzas: any[]) {
    try {
        const order = await prisma.order.create({
          data: {
            totalValue: totalValue,
            totalTime: totalTime,
            pizzas: {
              create: pizzas.map(pizza => ({
                size: pizza.size,
                flavor: pizza.flavor,
                customizations: pizza.customizations,
                preparationTime: pizza.preparationTime,
                value: pizza.value,
              })),
            },
          },
          include: {
            pizzas: true,
          },
        });

        return order

      } catch (error) {
        console.error("Error creating order:", error);
      }
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { pizzas: true },
    });
  
    if (!order) return null;

    return order as Order;
  }
  
  async listOrder(orderIds: string[]): Promise<Order> {
    const orders = await prisma.order.findMany({
      where: {
        id: { in: orderIds }, 
      },
      include: {
        pizzas: true, 
      },
    });

    return orders as unknown as Order;
  }
}

export { OrderRepository };
