
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";

export type OrderStatus = 'payment' | 'processing' | 'shipped' | 'delivered';

interface OrderProgressProps {
  initialStatus?: OrderStatus;
  orderId?: string;
  animated?: boolean;
  shipDate?: string;
  estimatedDelivery?: string;
}

const OrderProgress: React.FC<OrderProgressProps> = ({
  initialStatus = 'payment',
  orderId,
  animated = false,
  shipDate,
  estimatedDelivery,
}) => {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [progress, setProgress] = useState<number>(0);
  
  useEffect(() => {
    // Set initial progress based on status
    switch (initialStatus) {
      case 'payment':
        setProgress(10);
        break;
      case 'processing':
        setProgress(35);
        break;
      case 'shipped':
        setProgress(70);
        break;
      case 'delivered':
        setProgress(100);
        break;
    }
    
    // If animation is enabled, we'll progress through the statuses
    if (animated && initialStatus !== 'delivered') {
      const statusTimings = {
        payment: 10000,      // 10 seconds for demo (would be 1 day in production)
        processing: 15000,   // 15 seconds for demo (would be 1-2 days in production) 
        shipped: 20000,      // 20 seconds for demo (would be 2-3 days in production)
      };
      
      const progressInterval = setInterval(() => {
        setStatus(currentStatus => {
          switch (currentStatus) {
            case 'payment':
              return 'processing';
            case 'processing':
              return 'shipped';
            case 'shipped':
              return 'delivered';
            default:
              return currentStatus;
          }
        });
      }, statusTimings[initialStatus] || 15000);
      
      return () => clearInterval(progressInterval);
    }
  }, [initialStatus, animated]);
  
  // Update progress whenever status changes
  useEffect(() => {
    let targetProgress = 0;
    
    switch (status) {
      case 'payment':
        targetProgress = 10;
        break;
      case 'processing':
        targetProgress = 35;
        break;
      case 'shipped':
        targetProgress = 70;
        break;
      case 'delivered':
        targetProgress = 100;
        break;
    }
    
    // Animate progress
    if (progress < targetProgress) {
      const animationInterval = setInterval(() => {
        setProgress(currentProgress => {
          if (currentProgress >= targetProgress) {
            clearInterval(animationInterval);
            return targetProgress;
          }
          return currentProgress + 1;
        });
      }, 50);
      
      return () => clearInterval(animationInterval);
    }
  }, [status, progress]);
  
  // Get icon and color based on status
  const getStatusIcon = () => {
    switch (status) {
      case 'payment':
        return <Clock className="h-8 w-8 text-blue-500" />;
      case 'processing':
        return <Package className="h-8 w-8 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-8 w-8 text-orange-500" />;
      case 'delivered':
        return <CheckCircle2 className="h-8 w-8 text-green-500" />;
    }
  };
  
  // Get text description based on status
  const getStatusText = () => {
    switch (status) {
      case 'payment':
        return 'Payment Received';
      case 'processing':
        return 'Processing Order';
      case 'shipped':
        return 'Order Shipped';
      case 'delivered':
        return 'Order Delivered';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="mr-4">
          {getStatusIcon()}
        </div>
        <div>
          <p className="text-sm text-gray-500">Current Status</p>
          <h2 className="text-xl font-semibold">
            {getStatusText()}
          </h2>
          {(status === 'shipped' || status === 'processing') && estimatedDelivery && (
            <p className="text-sm mt-1">
              <Clock className="inline h-3 w-3 mr-1" />
              Estimated delivery: {estimatedDelivery}
            </p>
          )}
          {status === 'delivered' && shipDate && (
            <p className="text-sm mt-1">
              <Clock className="inline h-3 w-3 mr-1" />
              Delivered on {shipDate}
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <Progress value={progress} className="h-2 mb-3" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Payment</span>
          <span>Processing</span>
          <span>Shipped</span>
          <span>Delivered</span>
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;
