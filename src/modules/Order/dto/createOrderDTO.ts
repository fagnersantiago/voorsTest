import { createPizzaDto } from "../../Pizza/dto/createPizzaDTO";

 interface listOrderDTO {
    id: string;
    totalValue?: number;      
    totalTime?: number;  
    pizzas?: createPizzaDto[];
  }

export {listOrderDTO}