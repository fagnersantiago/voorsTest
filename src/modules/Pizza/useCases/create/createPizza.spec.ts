import 'reflect-metadata';
import { CreatePizzaUseCase } from './createPizza.useCase';
import { IPizza } from '../../repository/IPizza';
import { createPizzaDto } from '../../dto/createPizzaDTO';
import { InMemoryOrderRepository } from '../../../Order/repository/inMemory/orderRepository';
import { PizzaRepository } from '../../repository/pizzaRepository'; 

describe('CreatePizzaUseCase', () => {
  let createPizzaUseCase: CreatePizzaUseCase;
  let pizzaRepository: IPizza;
  let orderRepository: InMemoryOrderRepository;

  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    pizzaRepository = new PizzaRepository(orderRepository);
    createPizzaUseCase = new CreatePizzaUseCase(pizzaRepository);
  });

  it('should create pizzas successfully with valid data', async () => {
    const pizzaData: createPizzaDto = {
      pizzas: [
        {
          size: 'medium',
          flavor: ['calabresa'],
          customizations: [],
        },
        {
          size: 'large',
          flavor: ['portuguesa'],
          customizations: ['extra bacon'],
        },
      ],
    };

    pizzaRepository.chooseSizePizza = jest.fn()
      .mockResolvedValueOnce('medium')
      .mockResolvedValueOnce('large');
    pizzaRepository.chooseFlavorPizza = jest.fn()
      .mockResolvedValueOnce('calabresa')
      .mockResolvedValueOnce('portuguesa');
    pizzaRepository.create = jest.fn().mockResolvedValue([
      { size: 'medium', flavor: 'calabresa', customizations: [] },
      { size: 'large', flavor: 'portuguesa', customizations: ['extra bacon'] },
    ]);

    const pizzas = await createPizzaUseCase.execute(pizzaData);

    expect(pizzaRepository.chooseSizePizza).toHaveBeenCalledTimes(2);
    expect(pizzaRepository.chooseFlavorPizza).toHaveBeenCalledTimes(2);
    expect(pizzaRepository.create).toHaveBeenCalledWith({
      pizzas: [
        { size: 'medium', flavor: ['calabresa'], customizations: [] },
        { size: 'large', flavor: ['portuguesa'], customizations: ['extra bacon'] },
      ],
    });

    expect(pizzas).toEqual([
      { size: 'medium', flavor: 'calabresa', customizations: [] },
      { size: 'large', flavor: 'portuguesa', customizations: ['extra bacon'] },
    ]);
  });

  it('should throw an error for invalid pizza size', async () => {
    const pizzaData: createPizzaDto = {
      pizzas: [
        {
          size: 'invalid_size',
          flavor: ['calabresa'],
          customizations: [],
        },
      ],
    };

    pizzaRepository.chooseSizePizza = jest.fn().mockResolvedValue(null);

    await expect(createPizzaUseCase.execute(pizzaData)).rejects.toThrow('Invalid size for pizza: invalid_size');
  });

  it('should throw an error for invalid pizza flavor', async () => {
    const pizzaData: createPizzaDto = {
      pizzas: [
        {
          size: 'medium',
          flavor: ['invalid_flavor'],
          customizations: [],
        },
      ],
    };

    pizzaRepository.chooseSizePizza = jest.fn().mockResolvedValue('medium');
    pizzaRepository.chooseFlavorPizza = jest.fn().mockResolvedValue(null); 

    await expect(createPizzaUseCase.execute(pizzaData)).rejects.toThrow('Invalid flavor for pizza: invalid_flavor');
  });
});
