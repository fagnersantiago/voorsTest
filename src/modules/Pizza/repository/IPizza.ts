import { createPizzaDto } from '../dto/createPizzaDTO';
import { PizzaOrderDTO } from '../dto/calculateTimeDTO';
import { Pizza } from '../../Pizza/infra/prisma/entities/pizza';

interface IPizza {
  create(data: createPizzaDto): Promise<Pizza>;
  chooseSizePizza(size: string): Promise<string>;
  chooseFlavorPizza([flavor]:string);
  calculatePreparationTime(data: PizzaOrderDTO): Promise<number>;
}

export { IPizza };
