
// Define the missing exported types and functions
export interface PaymentDetails {
  id?: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  billingAddress?: string;
  paymentMethod?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
  logo?: string;
}

export const paymentOptions: PaymentMethod[] = [
  { id: 'credit_card', name: 'Credit Card' },
  { id: 'bank_transfer', name: 'Bank Transfer' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'crypto', name: 'Cryptocurrency' },
];

export const getPaymentDetails = (): PaymentDetails | null => {
  const savedDetails = localStorage.getItem('paymentDetails');
  return savedDetails ? JSON.parse(savedDetails) : null;
};

export const getAllPaymentDetails = (): PaymentDetails[] => {
  const savedDetails = localStorage.getItem('allPaymentDetails');
  return savedDetails ? JSON.parse(savedDetails) : [];
};

export const updatePaymentDetails = (details: PaymentDetails): void => {
  localStorage.setItem('paymentDetails', JSON.stringify(details));
  
  // Also update in the list of all payment details
  const allDetails = getAllPaymentDetails();
  const existingIndex = allDetails.findIndex(d => d.id === details.id);
  
  if (existingIndex >= 0) {
    allDetails[existingIndex] = details;
  } else {
    allDetails.push({
      ...details,
      id: Date.now().toString()
    });
  }
  
  localStorage.setItem('allPaymentDetails', JSON.stringify(allDetails));
};

export const createOrder = (orderData: any): Promise<{ orderId: string }> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`;
      localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
      resolve({ orderId });
    }, 1000);
  });
};

export const createPayment = (paymentData: any): Promise<{ paymentId: string }> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      const paymentId = `PAY-${Date.now()}`;
      localStorage.setItem(`payment_${paymentId}`, JSON.stringify(paymentData));
      resolve({ paymentId });
    }, 1000);
  });
};

export const confirmPayment = (paymentId: string): Promise<{ success: boolean }> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      const payment = localStorage.getItem(`payment_${paymentId}`);
      resolve({ success: !!payment });
    }, 1000);
  });
};

// Update any function that references originalQuantity to handle the case where it might be undefined
export const formatCartItems = (items) => {
  return items.map(item => ({
    quantity: item.quantity,
    originalQuantity: item.originalQuantity || item.quantity, // Fallback to quantity if originalQuantity is undefined
  }));
};
