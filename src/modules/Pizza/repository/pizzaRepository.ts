import 'reflect-metadata';
import { prisma } from '../infra/prisma';
import { createPizzaDto } from '../dto/createPizzaDTO';
import { PizzaOrderDTO } from '../dto/calculateTimeDTO';
import { IPizza } from './IPizza';
import { Pizza } from '../../Pizza/infra/prisma/entities/pizza';

const validSizes = ['small', 'medium', 'large'];
const validFlavors = ['calabresa', 'marguerita', 'portuguesa'];
const validCustomizations = ['extra bacon', 'sem cebola', 'borda recheada'];

class PizzaRepository implements IPizza {
  
    async create(data: createPizzaDto): Promise<Pizza> {
        const preparationTime = await this.calculatePreparationTime(data);
        const pizza = await prisma.pizza.create({
            data: {
                size: data.size,
                flavor: data.flavor,
                customizations: data.customizations,
                preparationTime: preparationTime,
                value: data.value,
                orderId: data.orderId,
            },
        });
        return pizza;
    }

    async chooseSizePizza(size: string): Promise<string> {
        const sizeOfPizza = validSizes.find(findSize => findSize === size)
        return sizeOfPizza;
    }

    async chooseFlavorPizza([flavor]:string){
      const flavorOfPizza = validFlavors.find(findFlavor => findFlavor === flavor)
      return flavorOfPizza
    }
    async calculatePreparationTime(data: PizzaOrderDTO): Promise<number> {
      let timeToPreparePizza = 0;
  
      if (data.size === "small") {
          timeToPreparePizza = 15;
      } 
      
      if (data.size === "medium") {
          timeToPreparePizza = 20;
      } 
      
      if (data.size === "large") {
          timeToPreparePizza = 30;
      }
  
      if (data.flavor === 'portuguesa') {
          timeToPreparePizza += 5;
      }
  
      return timeToPreparePizza;
  }
  
}

export { PizzaRepository };
