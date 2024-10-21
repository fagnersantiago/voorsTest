import 'reflect-metadata';
import { prisma } from '../infra/prisma';
import { createPizzaDto } from '../dto/createPizzaDTO';
import { PizzaOrderDTO } from '../dto/calculateTimeDTO';
import { IPizza } from './IPizza';
import { Pizza } from '../../Pizza/infra/prisma/entities/pizza';
import { OrderRepository } from '../../Order/repository/orderRepository';

const validSizes = ['small', 'medium', 'large'];
const validFlavors = ['calabresa', 'marguerita', 'portuguesa'];
class PizzaRepository implements IPizza {

  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository; 
  }
  async create(data: createPizzaDto): Promise<Pizza[]> {

    let totalTime = 0;
    let totalValue = 0;

    const pizzasPromises = data.pizzas.map(async pizzaData => {

      const preparationTime = await this.calculatePreparationTime(pizzaData);
      const value = await this.calculateValue(
        pizzaData.size,
        pizzaData.customizations,
      );

      totalTime += preparationTime;
      totalValue += value;

      const flavor = pizzaData.flavor instanceof Array ? pizzaData.flavor[0] : pizzaData.flavor;

      const createdPizza = await prisma.pizza.create({
        data: {
          size: pizzaData.size,
          flavor: flavor,
          customizations: pizzaData.customizations,
          preparationTime: preparationTime,
          value: value
        }
      });

      return {
        size: createdPizza.size,
        flavor: createdPizza.flavor,
        customizations: createdPizza.customizations,
        value: createdPizza.value,
        preparationTime: createdPizza.preparationTime,

      };

    });

    const pizzas = await Promise.all(pizzasPromises);

    await this.orderRepository.createOrder(totalValue, totalTime, pizzas);

    const pizzasCreted = pizzas.map((pizza) => ({
      ...pizza,
    }));

    return pizzasCreted as Pizza[]

  }

  async chooseSizePizza(size: string): Promise<string> {
    const sizeOfPizza = validSizes.find(findSize => findSize === size);
    return sizeOfPizza;
  }

  async chooseFlavorPizza([flavor]: string[]): Promise<string> {
    const flavorOfPizza = validFlavors.find(findFlavor => findFlavor === flavor);
    return flavorOfPizza;
  }

  async calculatePreparationTime(data: PizzaOrderDTO): Promise<number> {
    let timeToPreparePizza = 0;

    switch (data.size) {
      case 'small':
        timeToPreparePizza = 15;
        break;
      case 'medium':
        timeToPreparePizza = 20;
        break;
      case 'large':
        timeToPreparePizza = 30;
        break;
    }

    if (data.flavor[0] === 'portuguesa') {
      timeToPreparePizza += 5;
    }

    return timeToPreparePizza;
  }

  async calculateValue(size: string, customizations: string[]): Promise<number> {
    let baseValue = 0;

    switch (size) {
      case 'small':
        baseValue = 20.2;
        break;
      case 'medium':
        baseValue = 30.3;
        break;
      case 'large':
        baseValue = 40.0;
        break;
    }

    if (customizations) {
      customizations.forEach(customization => {
        switch (customization) {
          case 'extra bacon':
            baseValue += 3.0;
            break;
          case 'borda recheada':
            baseValue += 5.0;
            break;
        }
      });
    }

    return baseValue;
  }
}

export { PizzaRepository };
