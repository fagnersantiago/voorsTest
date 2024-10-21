# Pizzaria API

Este é um projeto de API REST para gerenciamento de pedidos e pizzas, desenvolvido em **Node.js** e **TypeScript**. A API permite aos usuários criar pizzas e pedidos, além de consultar detalhes de pedidos e pizzas.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma (ORM)
- PostgreSQL
- tsyringe (injeção de dependências)

## Funcionalidades

### Requisitos

1. **Montar Pizza**
   - Permite aos clientes escolher o tamanho, sabor e personalizações de uma pizza.
   - Armazena os detalhes da pizza, incluindo tempo de preparo e valor final.

2. **Personalizar Pizza**
   - Os clientes podem escolher adicionais para personalizar suas pizzas.

3. **Montar Pedido**
   - Permite aos clientes visualizar os detalhes do pedido, incluindo preço total e tempo de preparo.

### Endpoints

#### Criar Pizza

- **Método:** `POST`
- **Endpoint:** `/pizzas/creater`
- **Corpo da Requisição:**
  ```json
  {
    "size": "média",
    "flavor": "calabresa",
    "customizations": ["extra bacon"]
  }

#### Listar Pedio

- **Método:** `get`
- **Endpoint:** `/pizzas/:orderId`

  ```json
- **Método:** `GET`
- **Endpoint:** `/orders/:orderId`

### Parâmetro da Rota

- `orderId` (string): ID do pedido que se deseja consultar.

### Resposta

A resposta será um objeto JSON contendo os detalhes do pedido:

```json
{
  "id": "90ebb280-3c25-47bb-b3e2-fca5c905ae75",
  "totalValue": 88,
  "totalTime": 60,
  "pizzas": [
    {
      "id": "0adcd25b-9fa6-4119-842e-30e06c3d51ac",
      "size": "large",
      "flavor": "portuguesa",
      "customizations": [
        "extra bacon",
        "borda recheada"
      ],
      "preparationTime": 30,
      "value": 48,
      "orderId": "90ebb280-3c25-47bb-b3e2-fca5c905ae75"
    }
  ]
}
