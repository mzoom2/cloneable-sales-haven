import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Title from '@/components/Title';

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = () => {
    if (trackingNumber) {
      navigate(`/tracking-details/${trackingNumber}`);
    } else {
      alert('Please enter your tracking number.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Order Tracking" />
      <Header />

      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>•</span>
            <span className="font-medium text-gray-800">Order Tracking</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-[#1a0050] mb-6">
            Track Your Order
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter your tracking number to see the current status of your order.
          </p>

          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              placeholder="Enter your tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="border rounded-md py-2 px-3"
            />
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
              onClick={handleTrack}
            >
              Track
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackingPage;
