
 interface createPizzaDto {
  size: string;
  flavor: string;
  customizations: string[];
  value?: number;            
  preparationTime?: number;  
  orderId?: string;         
 }

export { createPizzaDto }