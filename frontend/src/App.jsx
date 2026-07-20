/// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Core Application UI Elements & Screens
import Header from './components/Header';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import ProfileScreen from './pages/ProfileScreen';

// Admin Inventory Control Dashboard Panels
import ProductListScreen from './pages/admin/ProductListScreen';
import ProductEditScreen from './pages/admin/ProductEditScreen'; // 🚀 Imported new edit layout screen

// Classy Vintage Footer
const DummyFooter = () => (
  <footer className="bg-neutral-950 border-t border-stone-900 py-6 text-center text-xs text-stone-600 font-mono mt-auto">
    © {new Date().getFullYear()} VINTAGE CORE • SECURE MANIFEST VAULT
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-stone-200 selection:bg-amber-600/30 selection:text-amber-500">
      {/* Dynamic Navigation Header for Real-time Token State */}
      <Header />

      {/* Main Container Viewport for Routing Layout */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <Routes>
          {/* Public E-Commerce Portal Routes */}
          <Route path="/" element={<HomeScreen />} index />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          {/* User Vault & Secure Checkout Pipelines */}
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />

          {/* Administrative Product Catalog Dashboard Controls */}
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />

          {/* Fallback Redirection Intercept */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <DummyFooter />
    </div>
  );
};

export default App;