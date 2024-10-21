import { Pizza } from '../../../../Pizza/infra/prisma/entities/pizza';
import { v4 as uuid } from 'uuid';

class Order {
  id: string;              
  totalValue: number;      
  totalTime: number;       
  pizzas: Pizza[];         
  createdAt: Date;         

  constructor(totalValue: number, totalTime: number) {
    this.id = uuid();    
    this.totalValue = totalValue; 
    this.totalTime = totalTime;  
    this.pizzas = [];  
    this.createdAt = new Date(); 
  }
}

export { Order };
