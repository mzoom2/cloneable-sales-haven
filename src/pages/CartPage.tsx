
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, X, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import ShippingCalculator from '@/components/ShippingCalculator';
import ShippingAddressForm, { ShippingAddress } from '@/components/ShippingAddressForm';
import { useAuth } from '@/contexts/AuthContext';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

const CartPage = () => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [shipping, setShipping] = useState(0); // Default shipping cost
  const [addressExpanded, setAddressExpanded] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const subtotal = getTotalPrice();
  const total = subtotal + shipping;
  
  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart"
    });
  };

  const handleDecreaseQuantity = (itemId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      handleRemoveItem(itemId);
    }
  };

  const handleIncreaseQuantity = (itemId: number, currentQuantity: number, maxQuantity: number) => {
    if (currentQuantity < maxQuantity) {
      updateQuantity(itemId, currentQuantity + 1);
    } else {
      toast({
        title: "Maximum quantity reached",
        description: "You cannot add more of this item",
        variant: "destructive"
      });
    }
  };

  const handleUpdateShipping = (amount: number) => {
    setShipping(amount);
    toast({
      title: "Shipping updated",
      description: `Shipping cost has been set to $${amount.toFixed(2)}`
    });
  };

  const handleAddressSubmit = (address: ShippingAddress) => {
    setAddressExpanded(false);
    // The address is already saved to localStorage in the ShippingAddressForm component
  };

  const handleCheckout = () => {
    // Check if shipping address exists
    const savedAddress = localStorage.getItem('shippingAddress');
    if (!savedAddress) {
      toast({
        title: "Shipping address required",
        description: "Please add a shipping address before checkout",
        variant: "destructive"
      });
      setAddressExpanded(true);
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to proceed with checkout",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Proceed with checkout
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to payment page"
    });
    // This would typically navigate to a checkout page
    // navigate('/checkout');
  };
  
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-10 mt-10">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="border-b p-4">
                <CardTitle className="text-xl">Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Minimum order notice */}
                <div className="p-4 flex items-center gap-2 text-red-600 border-b">
                  <AlertCircle size={20} />
                  <span>Minimum order quantity should be at least 5.</span>
                </div>
                
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
                          <img src="/placeholder.svg" alt={item.name} className="max-w-full max-h-full" />
                        </div>
                      </div>
                      <div className="col-span-2 font-medium">{item.name}</div>
                      <div className="col-span-1 text-center">{item.price.toFixed(2)}$</div>
                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                          >
                            -
                          </Button>
                          <Input 
                            type="number" 
                            className="h-8 w-12 rounded-none text-center" 
                            value={item.quantity}
                            readOnly
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleIncreaseQuantity(item.id, item.quantity, item.quantity + 10)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-1 text-right flex justify-end items-center">
                        <span className="mr-2">{(item.price * item.quantity).toFixed(2)}$</span>
                        <button 
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/shop-list')}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                )}
                
                {/* Coupon section */}
                {cartItems.length > 0 && (
                  <div className="p-4 border-b flex items-center gap-4 flex-wrap">
                    <div className="font-medium">Coupon:</div>
                    <div className="flex-1 max-w-xs">
                      <Input 
                        placeholder="Coupon code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" className="text-purple-600">
                      Apply coupon
                    </Button>
                    <div className="ml-auto">
                      <Button>
                        Update cart
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="border-b p-4">
                  <CardTitle className="text-xl">Cart Totals</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b">
                      <span>Subtotal</span>
                      <span>{subtotal.toFixed(2)}$</span>
                    </div>
                    
                    <div className="border-b">
                      <ShippingCalculator onUpdateShipping={handleUpdateShipping} />
                    </div>
                    
                    {/* Shipping Address Section */}
                    <Collapsible 
                      open={addressExpanded}
                      onOpenChange={setAddressExpanded}
                      className="w-full border-b pb-4"
                    >
                      <div className="flex justify-between py-2">
                        <span>Shipping Address</span>
                        <div className="text-right">
                          <CollapsibleTrigger asChild>
                            <Button variant="link" className="text-sm p-0 h-auto text-blue-600 flex items-center">
                              {addressExpanded ? "Hide" : "Add/Edit Address"}
                              <MapPin size={16} className="ml-1" />
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                      </div>
                      
                      <CollapsibleContent className="space-y-4 pt-2">
                        <ShippingAddressForm 
                          onAddressSubmit={handleAddressSubmit}
                          buttonText="Save Shipping Address"
                        />
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <div className="flex justify-between py-4 font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)}$</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
