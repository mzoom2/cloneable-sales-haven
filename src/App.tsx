
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ShopList from './pages/ShopList';
import Account from './pages/Account';
import OffersPage from './pages/OffersPage';
import CartPage from './pages/CartPage';
import Videos from './pages/Videos';
import OrderingGuide from './pages/OrderingGuide';
import PreRegister from './pages/PreRegister';
import TrackingPage from './pages/TrackingPage';
import TrackingDetailsPage from './pages/TrackingDetailsPage';
import AdminPage from './pages/AdminPage';
import PaymentPage from './pages/PaymentPage';
import Profile from './pages/Profile';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/contexts/CartContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/shop-list" element={<ShopList />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/ordering-guide" element={<OrderingGuide />} />
              <Route path="/preregister" element={<PreRegister />} />
              <Route path="/track" element={<TrackingPage />} />
              <Route path="/track/:id" element={<TrackingDetailsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </CartProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;
