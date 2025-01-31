import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import "./styles.css";
import { useCart } from "../../context/CartContext";

export function Header() {
  const { cart } = useCart();
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header_title">Shopee Low Budget</h1>
      </Link>
      <section className="header_cart-wrapper">
        <Link to="/cart">
          <ShoppingCart className="header_cart" color="#008ecc" />
          <span className="header_cart-count">{cartCount}</span>
        </Link>
      </section>
    </header>
  );
}
