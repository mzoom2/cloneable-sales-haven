
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Index from "./pages/Index";
import ShopList from "./pages/ShopList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PreRegister from "./pages/PreRegister";
import Videos from "./pages/Videos";
import OrderingGuide from "./pages/OrderingGuide";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import OffersPage from "./pages/OffersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Animation wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/shop-list" element={<ShopList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pre-register" element={<PreRegister />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/ordering-guide" element={<OrderingGuide />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
