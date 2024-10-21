import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IPizza } from '../../repository/IPizza';
import { createPizzaDto } from '../../dto/createPizzaDTO';

@injectable()
class CreatePizzaUseCase {
  constructor(
    @inject('PizzaRepository')
    private pizzaRepository: IPizza,
  ) {}

  async execute(data: createPizzaDto) {
    try {
    
      const validatedPizzas = await Promise.all(data.pizzas.map(async (pizzaData) => {
        const validSize = await this.pizzaRepository.chooseSizePizza(pizzaData.size);
        if (!validSize) {
          throw new Error(`Invalid size for pizza: ${pizzaData.size}`);
        }

        const validFlavor = await this.pizzaRepository.chooseFlavorPizza(pizzaData.flavor);
        if (!validFlavor) {
          throw new Error(`Invalid flavor for pizza: ${pizzaData.flavor.join(', ')}`);
        }

        return {
          size: validSize,
          flavor: Array.isArray(validFlavor) ? validFlavor : [validFlavor],
          customizations: pizzaData.customizations || [],
        };
      }));

      const pizzas = await this.pizzaRepository.create({ pizzas: validatedPizzas });
      return pizzas; 
    } catch (error) {
      throw error;
    }
  }
}

export { CreatePizzaUseCase };
