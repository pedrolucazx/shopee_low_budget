import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Card } from "../Card";
import "./styles.css";

export function Carousel({ products }) {
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(5);

  const updateVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 425) {
      setVisibleCards(1);
    } else if (width <= 728 && width > 425) {
      setVisibleCards(3);
    } else if (width <= 1024) {
      setVisibleCards(3);
    } else {
      setVisibleCards(5);
    }
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const totalProducts = products.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalProducts - visibleCards ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalProducts - visibleCards
    );
  };

  return (
    <div className="carousel_container">
      <button
        className="carousel_control carousel_control--prev"
        onClick={handlePrev}
        aria-label="Previous Product"
      >
        <ChevronLeft strokeWidth={3} />
      </button>
      <section className="carousel">
        <div className="carousel_viewport">
          <div
            className="carousel_track"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {products.map((product, index) => (
              <div className="carousel_slide" key={index}>
                <Card
                  productName={product.name}
                  productValue={`R$${product.value}`}
                  productImage={product.image}
                  onAddToCart={() => addToCart(product)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <button
        className="carousel_control carousel_control--next"
        onClick={handleNext}
        aria-label="Next Product"
      >
        <ChevronRight strokeWidth={3} />
      </button>
    </div>
  );
}
