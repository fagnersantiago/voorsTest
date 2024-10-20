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
      const validSizeOfPizza = await this.pizzaRepository.chooseSizePizza(data.size);

      if (!validSizeOfPizza) {
        throw Error('invalid Size!');
      }

      const isValidFlavor = await this.pizzaRepository.chooseFlavorPizza(data.flavor);

      if (!isValidFlavor) {
        throw Error('flavor is required!');
      }

      const prepartionTime = await this.pizzaRepository.calculatePreparationTime(data)

      const pizza = await this.pizzaRepository.create({
        size: validSizeOfPizza,
        flavor: isValidFlavor,
        customizations: data.customizations,
        preparationTime: null,
        value: data.value,
        orderId: null,
      });

      return pizza;
    } catch (error) {
      throw error;
    }
  }
}
export { CreatePizzaUseCase };
