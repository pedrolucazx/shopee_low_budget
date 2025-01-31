import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState({});
  const [discount, setDiscount] = useState({
    code: "",
    percentage: 0,
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.value,
              }
            : item
        );
      }

      return [
        ...prevCart,
        { ...product, quantity: 1, subtotal: product.value },
      ];
    });
  };

  const updateQuantity = (index, amount) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const item = updatedCart[index];

      if (item) {
        const updatedQuantity = item.quantity + amount;

        if (updatedQuantity > 0) {
          updatedCart[index] = {
            ...item,
            quantity: updatedQuantity,
            subtotal: updatedQuantity * item.value,
          };
        } else {
          updatedCart.splice(index, 1);
        }
      }

      return updatedCart;
    });
  };

  const applyDiscount = () => {
    if (discount.code === "DESC10") {
      setDiscount({ code: "DESC10", percentage: 0.1 });
      setErrors({});
    } else if (discount.code === "DESC20") {
      setDiscount({ code: "DESC20", percentage: 0.2 });
      setErrors({});
    } else {
      setErrors({ discountCode: "CUPOM INVÁLIDO" });
      setDiscount((prev) => ({ ...prev, percentage: 0 }));
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, cur) => acc + cur.subtotal, 0);
    return {
      total: subtotal,
      totalDiscount: subtotal - subtotal * discount?.percentage,
    };
  };

  const handleFocus = () => {
    setErrors((prev) => ({ ...prev, discountCode: undefined }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        calculateTotal,
        applyDiscount,
        discount,
        errors,
        handleFocus,
        setDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
