import { Route, BrowserRouter, Routes } from "react-router";
import "./App.css";
import { Carousel } from "./components/Carousel";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";

function App() {
  const products = [
    {
      id: 1,
      name: "One Piece Volume 1",
      value: 20,
      image: "https://images.penguinrandomhouse.com/cover/9781569319017",
    },
    {
      id: 2,
      name: "One Piece Volume 2",
      value: 20,
      image: "https://images.penguinrandomhouse.com/cover/9781591160571",
    },
    {
      id: 3,
      name: "One Piece Volume 3",
      value: 20,
      image: "https://m.media-amazon.com/images/I/71SN42ryBAL._SY466_.jpg",
    },
    {
      id: 4,
      name: "One Piece Volume 4",
      value: 20,
      image: "https://images.penguinrandomhouse.com/cover/9781421536286",
    },
    {
      id: 5,
      name: "One Piece Volume 5",
      value: 20,
      image:
        "https://m.media-amazon.com/images/I/61rZ8gU2sTL._SY445_SX342_PQ37_.jpg",
    },
    {
      id: 6,
      name: "One Piece Volume 6",
      value: 20,
      image: "https://m.media-amazon.com/images/I/91BY--NCtWL._SY466_.jpg",
    },
    {
      id: 7,
      name: "One Piece Volume 7",
      value: 20,
      image: "https://m.media-amazon.com/images/I/91-ZFbM2I-L._SY466_.jpg",
    },
    {
      id: 8,
      name: "One Piece Volume 8",
      value: 20,
      image: "https://m.media-amazon.com/images/I/91cY5IIaUlL._SY466_.jpg",
    },
    {
      id: 9,
      name: "One Piece Volume 9",
      value: 20,
      image: "https://images.penguinrandomhouse.com/cover/9781421501918",
    },
    {
      id: 10,
      name: "One Piece Volume 10",
      value: 20,
      image:
        "https://m.media-amazon.com/images/I/51GVOBzDaqL._SY445_SX342_PQ37_.jpg",
    },
  ];

  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Carousel products={products} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
