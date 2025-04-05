
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate tracking number (simple validation for demo)
    if (!trackingNumber || trackingNumber.length < 8) {
      toast({
        title: "Invalid tracking number",
        description: "Please enter a valid tracking number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // We're storing the tracking number for demo purposes, in a real app this would query a backend
      localStorage.setItem('lastTrackedOrder', trackingNumber);
      navigate(`/tracking-details/${trackingNumber}`);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-purple-100 mb-4">
              <Package className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Track Your Order</h1>
            <p className="mt-3 text-gray-500">Enter your tracking number to see the current status of your order</p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 border">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-1">
                  Tracking Number
                </label>
                <Input
                  id="tracking"
                  type="text"
                  placeholder="Enter your tracking number (e.g., UEP12345678)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Track Package"}
              </Button>
            </form>
            
            <div className="mt-8 border-t pt-6">
              <h3 className="text-sm font-semibold mb-2">Example Tracking Numbers for Testing:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div 
                  className="p-2 bg-gray-50 rounded border cursor-pointer hover:bg-gray-100"
                  onClick={() => setTrackingNumber('UEP12345678')}
                >
                  UEP12345678 (In Transit)
                </div>
                <div 
                  className="p-2 bg-gray-50 rounded border cursor-pointer hover:bg-gray-100"
                  onClick={() => setTrackingNumber('UEP87654321')}
                >
                  UEP87654321 (Delivered)
                </div>
                <div 
                  className="p-2 bg-gray-50 rounded border cursor-pointer hover:bg-gray-100"
                  onClick={() => setTrackingNumber('UEP11223344')}
                >
                  UEP11223344 (Processing)
                </div>
                <div 
                  className="p-2 bg-gray-50 rounded border cursor-pointer hover:bg-gray-100"
                  onClick={() => setTrackingNumber('UEP55667788')}
                >
                  UEP55667788 (Out for Delivery)
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackingPage;
