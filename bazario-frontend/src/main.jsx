import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes,Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProductsPage from "./pages/Products.jsx";
import CartPage from "./pages/CartPage.jsx";
import SellerDashboard from "./pages/Sellerdashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import Checkout from "./pages/Checkout.jsx";
import SellerAnalytics from "./pages/Selleranalytics.jsx";
import "./styles/global.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/seller/analytics" element={<SellerAnalytics />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
