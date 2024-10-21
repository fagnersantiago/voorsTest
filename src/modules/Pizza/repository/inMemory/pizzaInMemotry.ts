import { createPizzaDto } from '../../dto/createPizzaDTO';
import { PizzaOrderDTO } from '../../dto/calculateTimeDTO';
import { IPizza } from '../IPizza';
import { Pizza } from '../../infra/prisma/entities/pizza';

class PizzaRepositoryInMemory implements IPizza {
  private pizzas: Pizza[] = []; // Armazena as pizzas em memória
  private validSizes = ['small', 'medium', 'large'];
  private validFlavors = ['calabresa', 'marguerita', 'portuguesa'];

  async create(data: createPizzaDto): Promise<Pizza[]> {
    let totalTime = 0;
    let totalValue = 0;

    const pizzasPromises = data.pizzas.map(async (pizzaData) => {
      const preparationTime = await this.calculatePreparationTime(pizzaData);
      const value = await this.calculateValue(
        pizzaData.size,
        pizzaData.customizations
      );

      totalTime += preparationTime;
      totalValue += value;

      const flavor = Array.isArray(pizzaData.flavor)
        ? pizzaData.flavor[0]
        : pizzaData.flavor;

      const createdPizza: Pizza = {
        size: pizzaData.size,
        flavor: flavor,
        customizations: pizzaData.customizations || [],
        preparationTime: preparationTime,
        value: value,
        orderId: pizzaData[0].orderId
      };

     
      this.pizzas.push(createdPizza);
      return createdPizza as Pizza;
    });

    const pizzas = await Promise.all(pizzasPromises);
    
    return pizzas;
  }

  async chooseSizePizza(size: string): Promise<string> {
    return this.validSizes.includes(size) ? size : null;
  }

  async chooseFlavorPizza([flavor]: string[]): Promise<string> {
    return this.validFlavors.includes(flavor) ? flavor : null;
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
      customizations.forEach((customization) => {
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

  getPizzas(): Pizza[] {
    return this.pizzas;
  }
}

export { PizzaRepositoryInMemory };
