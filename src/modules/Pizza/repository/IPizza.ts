import { createPizzaDto } from '../dto/createPizzaDTO';
import { PizzaOrderDTO } from '../dto/calculateTimeDTO';
import { Pizza } from '../../Pizza/infra/prisma/entities/pizza';

interface IPizza {
  create(data: createPizzaDto): Promise<Pizza[]>;
  chooseSizePizza(size: string): Promise<string>;
  chooseFlavorPizza(flavor: string[]): Promise<string>;
  calculatePreparationTime(data: PizzaOrderDTO): Promise<number>;
  calculateValue(size: string, customizations?: string[]): Promise<number>
}

export { IPizza };
