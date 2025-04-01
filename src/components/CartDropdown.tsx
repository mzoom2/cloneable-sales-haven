
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import ShippingCalculator from '@/components/ShippingCalculator';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'cart' | 'offers'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [shipping, setShipping] = useState(0);
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getTotalPrice, getUniqueItemsCount } = useCart();
  
  const subtotal = getTotalPrice();
  const total = subtotal + shipping;
  const itemCount = getUniqueItemsCount();
  
  if (!isOpen) return null;

  const goToCart = () => {
    onClose();
    navigate('/cart');
  };

  const goToOffers = () => {
    onClose();
    navigate('/offers');
  };

  const handleUpdateShipping = (amount: number) => {
    setShipping(amount);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center" onClick={onClose}>
      <div 
        className="fixed right-0 top-16 w-full max-w-[1000px] z-50 overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0 rounded-none">
          <div className="border-b">
            <div className="flex border-b">
              <button
                className={`py-3 px-6 font-medium flex-1 text-center ${
                  activeTab === 'cart' ? 'border-b-2 border-purple-600' : ''
                }`}
                onClick={() => setActiveTab('cart')}
              >
                Cart
              </button>
              <button
                className={`py-3 px-6 font-medium flex-1 text-center ${
                  activeTab === 'offers' ? 'border-b-2 border-purple-600' : ''
                }`}
                onClick={() => setActiveTab('offers')}
              >
                Offers
              </button>
            </div>
            
            {/* Minimum order notice */}
            <div className="p-4 flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              <span>Minimum order quantity should be at least 5.</span>
            </div>
          </div>
          
          <CardContent className="p-0">
            {activeTab === 'cart' ? (
              <div>
                {/* Cart table header */}
                <div className="grid grid-cols-6 gap-4 p-4 bg-slate-100 text-sm font-medium">
                  <div className="col-span-1">Image</div>
                  <div className="col-span-2">Product Name</div>
                  <div className="col-span-1 text-center">Price</div>
                  <div className="col-span-1 text-center">Quantity</div>
                  <div className="col-span-1 text-right">Total</div>
                </div>
                
                {/* Cart items */}
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-6 gap-4 p-4 border-b items-center">
                      <div className="col-span-1">
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <img src="/placeholder.svg" alt={item.name} className="max-w-full max-h-full" />
                          )}
                        </div>
                      </div>
                      <div className="col-span-2 font-medium">{item.name}</div>
                      <div className="col-span-1 text-center">{item.price.toFixed(2)}$</div>
                      <div className="col-span-1 text-center">{item.quantity}</div>
                      <div className="col-span-1 text-right flex justify-end items-center">
                        <span className="mr-2">{(item.price * item.quantity).toFixed(2)}$</span>
                        <button 
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <ShoppingCart size={48} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        onClose();
                        navigate('/shop-list');
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                )}
                
                {/* Coupon section */}
                {cartItems.length > 0 && (
                  <div className="p-4 border-b flex items-center gap-4">
                    <div className="font-medium">Coupon:</div>
                    <div className="flex-1 max-w-xs">
                      <Input 
                        placeholder="Coupon code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                    </div>
                    <Button variant="link" className="text-purple-600">
                      Apply coupon
                    </Button>
                    <div className="ml-auto">
                      <Button onClick={goToCart}>
                        View Cart
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Cart totals */}
                {cartItems.length > 0 && (
                  <div className="flex">
                    <div className="flex-1"></div>
                    <div className="w-80 p-6 bg-gray-50">
                      <h3 className="text-lg font-bold mb-4">Cart totals</h3>
                      
                      <div className="flex justify-between py-2 border-b">
                        <span>Subtotal</span>
                        <span>{subtotal.toFixed(2)}$</span>
                      </div>
                      
                      <div className="border-b">
                        <ShippingCalculator onUpdateShipping={handleUpdateShipping} />
                      </div>
                      
                      <div className="flex justify-between py-4 font-bold">
                        <span>Total</span>
                        <span>{total.toFixed(2)}$</span>
                      </div>
                      
                      <Button className="w-full" onClick={goToCart}>
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p>No offers available at the moment.</p>
                <Button className="mt-4" onClick={goToOffers}>
                  View All Offers
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartDropdown;
