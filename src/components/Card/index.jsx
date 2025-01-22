import "./styles.css";

export function Card({ productName, productValue, productImage, onAddToCart }) {
  return (
    <article className="card">
      <div className="card__image">
        <img src={productImage} alt={productName} />
      </div>
      <footer className="card__footer">
        <span className="card__product-name">{productName}</span>
        <span className="card__product-value">{productValue}</span>
        <button className="card__add-to-cart" onClick={onAddToCart}>
          Adicionar ao Carrinho
        </button>
      </footer>
    </article>
  );
}
