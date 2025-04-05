import React from 'react';
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency } from '@/utils/currencyUtils';
import Title from '@/components/Title';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { currency } = useCurrency();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const taxRate = 0.10; // 10% tax rate
  const tax = subtotal * taxRate;
  const shippingCost = subtotal > 0 ? 25 : 0;
  const total = subtotal + tax + shippingCost;

  const handleRemoveFromCart = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Shopping Cart" />
      <Header />

      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <span className="font-medium text-gray-800">Shopping Cart</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        {isCartEmpty ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600">Add items to your cart to proceed to checkout.</p>
            <Button onClick={() => navigate('/shop-list')} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-3/4">
              <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center border rounded-md p-4">
                    <img src={item.images.main} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">
                        Price: {formatCurrency(item.price, currency)}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm" onClick={() => handleRemoveFromCart(item.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={handleClearCart} className="mt-4">
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/4">
              <div className="border rounded-md p-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
                  <span>{formatCurrency(tax, currency)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>{formatCurrency(shippingCost, currency)}</span>
                </div>
                <div className="flex justify-between font-semibold mb-4">
                  <span>Total:</span>
                  <span>{formatCurrency(total, currency)}</span>
                </div>
                <Button onClick={handleCheckout} disabled={isCartEmpty} className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
