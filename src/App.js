import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductListingPage from "./pages/ProductListingPage/ProductListingPage";
import ProductViewPage from "./pages/ProductViewPage/ProductViewPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />

          <Route path="/produtos" element={<ProductListingPage />} />
          
          <Route path="/product/:id" element={<ProductViewPage />} />

          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/meus-pedidos" element={<OrdersPage />} />
          <Route path="/cadastro" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
