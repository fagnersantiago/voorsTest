import { v4 as uuid } from 'uuid';

class Pizza {
  public id?: string;
  public size: string;
  public flavor: string;
  public customizations: string[];
  public value: number;
  public preparationTime: number;
  public orderId: string;

  constructor(
    size: string,
    flavor: string,
    customizations: string[],
    value: number,
    preparationTime: number,
    orderId: string,
  ) {
    this.size = size;
    this.flavor = flavor;
    this.customizations = customizations;
    this.value = value;
    this.preparationTime = preparationTime;
    this.orderId = orderId;

    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Pizza };
