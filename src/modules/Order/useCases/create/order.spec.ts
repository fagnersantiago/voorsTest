import 'reflect-metadata';
import { ListOrderUseCase } from './order.useCase';
import { listOrderDTO } from '../../dto/createOrderDTO'; 
import { InMemoryOrderRepository } from '../../repository/inMemory/orderRepository';

describe('ListOrderUseCase', () => {
  let listOrderUseCase: ListOrderUseCase;
  let orderRepository: InMemoryOrderRepository;

  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    listOrderUseCase = new ListOrderUseCase(orderRepository);
  });
  afterEach(() => {
    jest.clearAllMocks(); 
  });
  
  it('should return the order when it exists', async () => {
    const orderData = {
      id: '1', 
      totalValue: 50.0,
      totalTime: 30,
      pizzas: [],
    };

    await orderRepository.createOrder(orderData.totalValue, orderData.totalTime, orderData.pizzas);

    const createOrderDto: listOrderDTO = { id: '1' }; 

    const result = await listOrderUseCase.execute(createOrderDto);

    expect(result).toEqual(expect.arrayContaining([expect.objectContaining(orderData)]));
  });

  it('should throw an error when the order does not exist', async () => {
    const createOrderDto: listOrderDTO = { id: '999' }; 
  
    await expect(listOrderUseCase.execute(createOrderDto)).rejects.toThrow('Order not exists');
  });


});
