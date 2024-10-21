import { Order } from "../../infra/prisma/entities/order";
import { OrderRepository } from "../orderRepository";

class InMemoryOrderRepository implements OrderRepository {
    private orders: any[] = [];
  
    async createOrder(totalValue: number, totalTime: number, pizzas: any[]): Promise<any> {
      const order = {
        id: `${this.orders.length + 1}`, 
        totalValue,
        totalTime,
        pizzas,
      };
      this.orders.push(order);
      return order;
    }
  
    async findById(id: string): Promise<any | null> {
      return this.orders.find(order => order.id === id) || null;
    }
  
    async listOrder(orderIds: string[]): Promise<Order> {
      const listOrder = this.orders.filter(order => orderIds.includes(order.id));
     return listOrder as unknown as Order
    }
  }
  

  export { InMemoryOrderRepository }