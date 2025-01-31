import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./styles.css";

export function Cart() {
  const {
    cart,
    updateQuantity,
    calculateTotal,
    applyDiscount,
    discount,
    errors,
    handleFocus,
    setDiscount,
  } = useCart();

  return (
    <div className="cart-container">
      <main className="cart-main">
        <section className="cart-main_section--table">
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
                    <div className="cart-table_quantity">
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, -1)}
                        aria-label="Reduzir quantidade"
                        className="cart-table_button cart-table_button--decrease"
                      >
                        <Minus color="red" size="19" />
                      </button>
                      {cartItem.quantity}
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, 1)}
                        aria-label="Aumentar quantidade"
                        className="cart-table_button cart-table_button--increase"
                      >
                        <Plus color="green" size="19" />
                      </button>
                    </div>
                  </td>
                  <td>{cartItem.value}</td>
                  <td>{cartItem.subtotal}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, -cartItem.quantity)}
                      aria-label="Remover produto"
                      className="cart-table_button cart-table_button--remove"
                    >
                      <Trash2 color="red" size="19" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="cart-main_section--discount">
          <div className="cart-total">
            <p className="cart-total_item">
              <strong>Total (sem desconto):</strong>
              <span>R$ {calculateTotal().total.toFixed(2)}</span>
            </p>
            <p className="cart-total_item">
              <strong>Total com desconto:</strong>
              <span className="cart-total_discounted">
                R$ {calculateTotal().totalDiscount.toFixed(2)}
              </span>
            </p>
          </div>
          <div className="cart-discount">
            <div className="cart-discount_input-group">
              <label htmlFor="discountCode" className="cart-discount_label">
                Cupom de desconto
              </label>
              <input
                id="discountCode"
                name="discountCode"
                type="text"
                value={discount.code}
                placeholder="Insira o cupom de desconto"
                className={`cart-discount_input ${
                  errors.discountCode ? "cart-discount_input--error" : ""
                }`}
                onFocus={handleFocus}
                onChange={(e) =>
                  setDiscount((prev) => ({
                    ...prev,
                    code: e.target.value,
                  }))
                }
                aria-invalid={!!errors.discountCode}
                aria-describedby="discountCode-error"
              />
              {errors.discountCode && (
                <small
                  id="discountCode-error"
                  className="cart-discount_error-message"
                >
                  {errors.discountCode}
                </small>
              )}
            </div>
            <button onClick={applyDiscount} className="cart-discount_button">
              Aplicar Cupom
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
