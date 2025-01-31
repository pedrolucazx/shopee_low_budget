# Shopee Low Budget

## 🚀 Tecnologias Utilizadas

- React
- React Router DOM
- Context
- CSS
- Lucide React (icons)

## 📌 Funcionalidades

- Adicionar produtos ao carrinho
- Atualizar quantidade de produtos no carrinho
- Aplicar cupons de desconto (DESC10 e DESC20)
- Calcular o total da compra com desconto
- Exibir os produtos disponíveis

## 📂 Estrutura do Projeto

```
├── src
│   ├── components
│   │   ├── Carousel
│   │   ├── Cart
│   │   ├── Header
│   │   ├── Card
│   ├── context
│   │   ├── CartContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
└── public
```

## ⚙️ Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/pedrolucazx/shopee_low_budget.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o projeto:
   ```bash
   npm start
   ```

## 🛒 Como Utilizar

1. Acesse a página principal para visualizar os produtos disponíveis.
2. Adicione produtos ao carrinho clicando no botão `Adicionar ao Carrinho`.
3. Vá até a página do carrinho para visualizar os itens adicionados.
4. Modifique a quantidade de produtos ou remova itens do carrinho.
5. Aplique cupons de desconto válidos: `DESC10` (10%) ou `DESC20` (20%).
6. Veja o total da compra com o desconto aplicado.

## 📌 Exemplo de Uso do Context

Para utilizar os métodos do contexto do carrinho:

```javascript
import { useCart } from "../context/CartContext";

const { cart, addToCart, updateQuantity, applyDiscount, calculateTotal } =
  useCart();
```
