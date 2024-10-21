import { createPizzaDto } from "../../Pizza/dto/createPizzaDTO";

 interface createOrderDTO {
    id: string;
    totalValue?: number;      
    totalTime?: number;  
    pizzas?: createPizzaDto[];
  }

export {createOrderDTO}