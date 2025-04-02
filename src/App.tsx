
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PreRegister from './pages/PreRegister';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import OrderingGuide from './pages/OrderingGuide';
import Profile from './pages/Profile';
import Account from './pages/Account';
import Videos from './pages/Videos';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import CartPage from './pages/CartPage';
import ShopList from './pages/ShopList';
import OffersPage from './pages/OffersPage';
import OfferAcceptedDialog from './components/OfferAcceptedDialog';
import TrackingPage from './pages/TrackingPage';
import TrackingDetailsPage from './pages/TrackingDetailsPage';
import AdminPage from './pages/AdminPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/preregister" element={<PreRegister />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/ordering-guide" element={<OrderingGuide />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/shop-list" element={<ShopList />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/track" element={<TrackingPage />} />
              <Route path="/tracking-details/:trackingNumber" element={<TrackingDetailsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <OfferAcceptedDialog />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
