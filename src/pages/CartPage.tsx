
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Sample cart item type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Sample cart data - in a real app this would come from state or context
const sampleCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Unlocked iPhone 15 Pro 256GB Mix Color (e-sim) (A+/A Grade)',
    price: 697.20,
    quantity: 1,
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Unlocked Samsung Galaxy S23 Ultra 512GB (e-sim) (A Grade)',
    price: 849.99,
    quantity: 2,
    image: '/placeholder.svg'
  }
];

const CartPage = () => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = React.useState('');
  
  const subtotal = sampleCartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );
  
  const shipping = 25; // Fixed shipping for now
  const total = subtotal + shipping;
  
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
                {sampleCartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-6 gap-4 p-4 border-b items-center">
                    <div className="col-span-1">
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="max-w-full max-h-full" />
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
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-1 text-right flex justify-end items-center">
                      <span className="mr-2">{(item.price * item.quantity).toFixed(2)}$</span>
                      <button className="text-gray-400 hover:text-red-500">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Coupon section */}
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
              </CardContent>
            </Card>
          </div>
          
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
                  
                  <div className="flex justify-between py-2 border-b">
                    <span>Shipping</span>
                    <div className="text-right">
                      <p className="text-sm">Flat rate: {shipping.toFixed(2)}$</p>
                      <Button variant="link" className="text-sm p-0 h-auto text-blue-600">
                        Calculate shipping
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between py-4 font-bold">
                    <span>Total</span>
                    <span>{total.toFixed(2)}$</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4">
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
