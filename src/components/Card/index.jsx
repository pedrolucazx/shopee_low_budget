import "./styles.css";

export function Card({ productName, productValue, productImage, onAddToCart }) {
  return (
    <article className="card">
      <div className="card_image">
        <img src={productImage} alt={productName} />
      </div>
      <footer className="card_footer">
        <span className="card_product-name">{productName}</span>
        <span className="card_product-value">{productValue}</span>
        <button className="card_add-to-cart" onClick={onAddToCart}>
          Adicionar ao Carrinho
        </button>
      </footer>
    </article>
  );
}
