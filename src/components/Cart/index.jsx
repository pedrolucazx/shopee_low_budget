import { useState } from "react";
import "./styles.css";
import { Minus, Plus, Trash2 } from "lucide-react";

export function Cart() {
  const [cart, setCart] = useState([]);
  const [item, setItem] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [discount, setDiscount] = useState({
    code: "",
    percentage: 0,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!item.name.trim()) {
      newErrors.name = "Nome do produto é obrigatório";
    }
    if (!item.quantity.trim() || item.quantity <= 0) {
      newErrors.quantity = "Quantidade é obrigatória";
    }
    if (!item.price.trim() || item.price <= 0) {
      newErrors.price = "Preço é obrigatório";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const groupCartItems = (cart, newItem) => {
    return cart.map((cartItem) => {
      if (cartItem.name === newItem.name) {
        const updatedQuantity = cartItem.quantity + newItem.quantity;
        return {
          ...cartItem,
          quantity: updatedQuantity,
          subtotal: updatedQuantity * cartItem.price,
        };
      }
      return cartItem;
    });
  };

  const addCart = (e) => {
    e.preventDefault();
    if (validate()) {
      const newItem = {
        ...item,
        quantity: parseInt(item.quantity, 10),
        price: parseFloat(item.price),
        subtotal: parseInt(item.quantity, 10) * parseFloat(item.price),
      };

      const existingItemIndex = cart.findIndex(
        (cartItem) => cartItem.name === newItem.name
      );

      if (existingItemIndex !== -1) {
        const updatedCart = groupCartItems(cart, newItem);
        setCart(updatedCart);
      } else {
        setCart([...cart, newItem]);
      }

      setItem({ name: "", quantity: "", price: "" });
    }
  };
  const updateQuantity = (index, change) => {
    setCart((prev) => {
      const updatedCart = [...prev];
      const item = updatedCart[index];
      const newQuantity = item.quantity + change;

      if (newQuantity > 0) {
        updatedCart[index] = {
          ...item,
          quantity: newQuantity,
          subtotal: newQuantity * item.price,
        };
      } else {
        updatedCart.splice(index, 1);
      }

      return updatedCart;
    });
  };

  const applyDiscount = () => {
    if (discount.code === "DESC10") {
      setDiscount({ code: "DESC10", percentage: 0.1 });
    } else if (discount.code === "DESC20") {
      setDiscount({ code: "DESC20", percentage: 0.2 });
    } else {
      setErrors({ discountCode: "CUPOM INVÁLIDO" });
      setDiscount({ code: "", percentage: 0 });
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, cur) => acc + cur.subtotal, 0);

    return {
      total: subtotal,
      totalDiscount: subtotal - subtotal * discount?.percentage,
    };
  };

  return (
    <div className="container">
      <header>
        <h1>Shopee Low Budget</h1>
      </header>

      <main>
        <section className="form-section">
          <form onSubmit={addCart} noValidate>
            <div className="input-group">
              <label htmlFor="name">
                Nome do produto <small>*</small>
              </label>
              <input
                required
                id="name"
                name="name"
                type="text"
                value={item.name}
                onFocus={handleFocus}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
                placeholder="Digite o nome do produto"
                className={`input-field ${errors.name ? "error" : ""}`}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
              />
              {errors.name && (
                <small id="name-error" className="error-message">
                  {errors.name}
                </small>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="quantity">
                Quantidade <small>*</small>
              </label>
              <input
                required
                id="quantity"
                name="quantity"
                type="number"
                value={item.quantity}
                onFocus={handleFocus}
                aria-invalid={!!errors.quantity}
                aria-describedby="quantity-error"
                placeholder="Digite a quantidade"
                className={`input-field ${errors.quantity ? "error" : ""}`}
                onChange={(e) => setItem({ ...item, quantity: e.target.value })}
              />
              {errors.quantity && (
                <small id="quantity-error" className="error-message">
                  {errors.quantity}
                </small>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="price">
                Preço unitário <small>*</small>
              </label>
              <input
                required
                id="price"
                name="price"
                type="number"
                value={item.price}
                onFocus={handleFocus}
                placeholder="Digite o preço"
                aria-invalid={!!errors.price}
                aria-describedby="price-error"
                className={`input-field ${errors.price ? "error" : ""}`}
                onChange={(e) => setItem({ ...item, price: e.target.value })}
              />
              {errors.price && (
                <small id="price-error" className="error-message">
                  {errors.price}
                </small>
              )}
            </div>

            <button type="submit">Adicionar</button>
          </form>
        </section>

        <section className="cart-section">
          <table className="cart-table">
            <thead>
              <tr>
                <th scope="col">Produto</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Preço unitário</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, index) => (
                <tr key={index}>
                  <td>{cartItem.name}</td>
                  <td>
                    <div>
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, -1)}
                        aria-label="Reduzir quantidade"
                      >
                        <Minus color="red" size="19" />
                      </button>
                      {cartItem.quantity}
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, 1)}
                        aria-label="Aumentar quantidade"
                      >
                        <Plus color="green" size="19" />
                      </button>
                    </div>
                  </td>
                  <td>R${cartItem.price.toFixed(2)}</td>
                  <td>R${cartItem.subtotal.toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, -cartItem.quantity)}
                      aria-label="Remover produto"
                    >
                      <Trash2 color="red" size="19" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="discount-section">
          <div className="total-container">
            <p>
              <strong>Total (sem desconto):</strong>
              <span>R$ {calculateTotal().total.toFixed(2)}</span>
            </p>
            <p>
              <strong>Total com desconto:</strong>
              <span className="discounted-total">
                R$ {calculateTotal().totalDiscount.toFixed(2)}
              </span>
            </p>
          </div>
          <div className="discount-container">
            <div className="input-group">
              <label htmlFor="discountCode">Cupom de desconto</label>
              <input
                id="discountCode"
                name="discountCode"
                type="text"
                value={discount?.code}
                placeholder="Insira o cupom de desconto"
                className={`input-field ${errors.discountCode ? "error" : ""}`}
                onFocus={handleFocus}
                onChange={(e) =>
                  setDiscount({ ...discount, code: e.target.value })
                }
                aria-invalid={!!errors.discountCode}
                aria-describedby="discountCode-error"
              />
              {errors.discountCode && (
                <small id="discountCode-error" className="error-message">
                  {errors.discountCode}
                </small>
              )}
            </div>
            <button onClick={applyDiscount}>Aplicar Cupom</button>
          </div>
        </section>
      </main>
    </div>
  );
}
