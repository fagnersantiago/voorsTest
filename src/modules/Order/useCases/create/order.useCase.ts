


import { OrderRepository } from "../../repository/orderRepository";
import { listOrderDTO } from "../../dto/createOrderDTO";
import { inject, injectable } from 'tsyringe';

@injectable()
class ListOrderUseCase {
  constructor(
    @inject('OrderRepository')
    private orderRepository: OrderRepository) {}

  async execute(data: listOrderDTO) {
   try {
    const order = await this.orderRepository.findById(data.id);

    if(!order) {
      throw new Error("Order not exists")
    }

  const listOrder = await this.orderRepository.listOrder([order.id])
    
  return listOrder

   } catch (error) {
    throw new Error(`Error fetching order: ${error.message}`);
   }
  }
}

export { ListOrderUseCase }