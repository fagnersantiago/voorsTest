interface createPizzaDto {
  pizzas: {
    size: string;
    flavor: string[];
    customizations: string[];
  }[];
}

export { createPizzaDto };
