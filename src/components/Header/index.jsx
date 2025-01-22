import { Search, ShoppingCart } from "lucide-react";
import "./styles.css";

export function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Shopee Low Budget</h1>
      <div className="header__search">
        <div className="header__input-wrapper">
          <Search className="header__icon" color="#008ecc" />
          <input
            className="header__input"
            type="text"
            placeholder="Pesquisar"
            aria-label="Pesquisar produtos"
          />
        </div>
      </div>
      <ShoppingCart className="header__cart" color="#008ecc" />
    </header>
  );
}
