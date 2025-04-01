
import { CartItem } from '@/contexts/CartContext';

export interface CreateOrderRequest {
  user_id: string; // This will now be the user's email
  total_amount: number;
  items: {
    id: number;
    quantity: number;
    price: number;
  }[];
}

export interface CreatePaymentRequest {
  order_id: number;
  payment_method: PaymentMethod;
  amount: number;
}

export type PaymentMethod = 
  | 'bank_transfer'
  | 'western_union'
  | 'bitcoin'
  | 'usdt'
  | 'paypal'
  | 'ria'
  | 'fps'
  | 'alipay'
  | 'wechat'
  | 'apple_pay';

export interface PaymentDetails {
  bank_transfer?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    routingNumber: string;
    swiftCode: string;
  };
  western_union?: {
    recipientName: string;
    city: string;
    country: string;
  };
  crypto?: {
    address: string;
    network: string;
  };
  paypal?: {
    email: string;
  };
  ria?: {
    recipientName: string;
    address: string;
  };
  fps?: {
    phoneNumber: string;
    accountName: string;
  };
  alipay?: {
    qrCodeUrl: string;
  };
  wechat?: {
    qrCodeUrl: string;
  };
}

export interface PaymentOption {
  id: PaymentMethod;
  name: string;
  icon: string;
  description: string;
}

export const paymentOptions: PaymentOption[] = [
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: 'building-bank',
    description: 'Direct bank transfer to our account'
  },
  {
    id: 'western_union',
    name: 'Western Union',
    icon: 'arrow-right-circle',
    description: 'Send money via Western Union'
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin (BTC)',
    icon: 'bitcoin',
    description: 'Pay with Bitcoin cryptocurrency'
  },
  {
    id: 'usdt',
    name: 'Tether (USDT)',
    icon: 'circle-dollar-sign',
    description: 'Pay with USDT stablecoin'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'paypal',
    description: 'Pay using your PayPal account'
  },
  {
    id: 'ria',
    name: 'RIA Money Transfer',
    icon: 'landmark',
    description: 'Send money via RIA'
  },
  {
    id: 'fps',
    name: 'Faster Payment System (FPS)',
    icon: 'zap',
    description: 'Instant bank transfer using FPS'
  },
  {
    id: 'alipay',
    name: 'Alipay',
    icon: 'qr-code',
    description: 'Pay using Alipay app'
  },
  {
    id: 'wechat',
    name: 'WeChat Pay',
    icon: 'message-square',
    description: 'Pay using WeChat app'
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    icon: 'apple',
    description: 'Pay using Apple Pay'
  }
];

// Get all payment details from the backend
export const getAllPaymentDetails = async (): Promise<PaymentDetails> => {
  try {
    const response = await fetch('/api/payment-settings');
    
    if (!response.ok) {
      throw new Error('Failed to fetch payment details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching payment details:', error);
    // Return mock data as fallback
    return getDefaultPaymentDetails();
  }
};

// Update payment details
export const updatePaymentDetails = async (details: PaymentDetails): Promise<void> => {
  try {
    const response = await fetch('/api/payment-settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update payment details');
    }
  } catch (error) {
    console.error('Error updating payment details:', error);
    throw error;
  }
};

// Mock default payment details for demonstration
export const getDefaultPaymentDetails = (): PaymentDetails => {
  return {
    bank_transfer: {
      bankName: 'UEPhone Bank',
      accountNumber: '1234567890',
      accountName: 'UEPhone Ltd',
      routingNumber: '987654321',
      swiftCode: 'UEPHNK22'
    },
    western_union: {
      recipientName: 'UEPhone Limited',
      city: 'Hong Kong',
      country: 'China'
    },
    crypto: {
      address: '0x1a2b3c4d5e6f7g8h9i0j',
      network: 'Bitcoin/Ethereum (ERC-20)'
    },
    paypal: {
      email: 'payments@uephones.com'
    },
    ria: {
      recipientName: 'UEPhone Limited',
      address: '123 Tech Street, Hong Kong'
    },
    fps: {
      phoneNumber: '+85246297806',
      accountName: 'UEPhone Limited'
    },
    alipay: {
      qrCodeUrl: 'https://placeholder.com/alipay-qr'
    },
    wechat: {
      qrCodeUrl: 'https://placeholder.com/wechat-qr'
    }
  };
};

// Get payment details for a specific method (first tries to fetch from backend, fallbacks to default)
export const getPaymentDetails = async (method: PaymentMethod): Promise<PaymentDetails> => {
  try {
    const allDetails = await getAllPaymentDetails();
    return filterPaymentDetailsByMethod(allDetails, method);
  } catch (error) {
    console.error('Error getting payment details, using defaults:', error);
    const defaultDetails = getDefaultPaymentDetails();
    return filterPaymentDetailsByMethod(defaultDetails, method);
  }
};

// Helper function to filter payment details by method
const filterPaymentDetailsByMethod = (allDetails: PaymentDetails, method: PaymentMethod): PaymentDetails => {
  const details: PaymentDetails = {};
  
  switch (method) {
    case 'bank_transfer':
      if (allDetails.bank_transfer) {
        details.bank_transfer = allDetails.bank_transfer;
      }
      break;
    case 'western_union':
      if (allDetails.western_union) {
        details.western_union = allDetails.western_union;
      }
      break;
    case 'bitcoin':
    case 'usdt':
      if (allDetails.crypto) {
        details.crypto = allDetails.crypto;
      }
      break;
    case 'paypal':
      if (allDetails.paypal) {
        details.paypal = allDetails.paypal;
      }
      break;
    case 'ria':
      if (allDetails.ria) {
        details.ria = allDetails.ria;
      }
      break;
    case 'fps':
      if (allDetails.fps) {
        details.fps = allDetails.fps;
      }
      break;
    case 'alipay':
      if (allDetails.alipay) {
        details.alipay = allDetails.alipay;
      }
      break;
    case 'wechat':
      if (allDetails.wechat) {
        details.wechat = allDetails.wechat;
      }
      break;
    default:
      break;
  }
  
  return details;
};

// Create an order
export const createOrder = async (cartItems: CartItem[], userEmail: string, totalAmount: number) => {
  try {
    const orderData: CreateOrderRequest = {
      user_id: userEmail, // Using email as the identifier
      total_amount: totalAmount,
      items: cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };
    
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Create a payment
export const createPayment = async (orderId: number, paymentMethod: PaymentMethod, amount: number) => {
  try {
    const paymentData: CreatePaymentRequest = {
      order_id: orderId,
      payment_method: paymentMethod,
      amount: amount
    };
    
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create payment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// Confirm a payment
export const confirmPayment = async (paymentId: number) => {
  try {
    const response = await fetch(`/api/payments/${paymentId}/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to confirm payment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

// Get order details
export const getOrder = async (orderId: number) => {
  try {
    const response = await fetch(`/api/orders/${orderId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// Get orders by user
export const getOrdersByUser = async (userEmail: string) => {
  try {
    const response = await fetch(`/api/orders/by-user/${userEmail}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Get order by tracking number
export const getOrderByTracking = async (trackingNumber: string) => {
  try {
    const response = await fetch(`/api/orders/by-tracking/${trackingNumber}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};
