import "reflect-metadata";
import { container } from 'tsyringe';
import { IPizza } from "../../modules/Pizza/repository/IPizza";
import { PizzaRepository } from "../../modules/Pizza/repository/pizzaRepository";


container.registerSingleton<IPizza>(
  'PizzaRepository',
    PizzaRepository,
);




