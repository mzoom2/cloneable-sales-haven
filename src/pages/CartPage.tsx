import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingCart } from 'lucide-react';
import Title from '@/components/Title';
import { formatCurrency } from '@/utils/currencyUtils';
import { useCurrency } from '@/contexts/CurrencyContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { currency } = useCurrency();

  const handleRemove = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const total = calculateTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Title title="Shopping Cart" />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => navigate('/shop-list')} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Shopping Cart" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <img src={item.images.main} alt={item.name} className="h-20 w-20 object-cover rounded-md mr-4" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
                    <p className="text-gray-500">{formatCurrency(item.price, currency)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
          <div>
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(total, currency)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-800 mb-4">
                <span>Total</span>
                <span>{formatCurrency(total, currency)}</span>
              </div>
              <Button className="w-full mb-2" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
