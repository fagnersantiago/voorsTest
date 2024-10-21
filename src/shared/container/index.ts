import { container } from 'tsyringe';
import { PizzaRepository } from "../../modules/Pizza/repository/pizzaRepository";
import { IPizza } from "../../modules/Pizza/repository/IPizza";
import { OrderRepository } from "../../modules/Order/repository/orderRepository";
import { IOrder }  from "../../modules/Order/repository/IOrder"

container.registerSingleton<IPizza>(
  'PizzaRepository',
    PizzaRepository,
);

container.registerSingleton<IOrder>(
  'OrderRepository',
  OrderRepository,
);


