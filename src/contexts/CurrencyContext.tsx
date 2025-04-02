
import React, { createContext, useContext, useState, useEffect } from 'react';

// Exchange rate: 1 USD to EUR (this would ideally come from an API)
const EUR_EXCHANGE_RATE = 0.92;

type CurrencyType = 'USD' | 'EUR';

interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to USD
  const [currency, setCurrency] = useState<CurrencyType>('USD');

  // Load saved currency preference if available
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency === 'USD' || savedCurrency === 'EUR') {
      setCurrency(savedCurrency);
    }
  }, []);

  // Save currency preference when it changes
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  // Convert price from USD to the selected currency
  const convertPrice = (price: number): number => {
    if (currency === 'EUR') {
      return +(price * EUR_EXCHANGE_RATE).toFixed(2);
    }
    return price;
  };

  // Format price with the appropriate currency symbol
  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    
    if (currency === 'EUR') {
      return `€${convertedPrice.toFixed(2)}`;
    }
    
    return `$${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
