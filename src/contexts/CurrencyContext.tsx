
import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInUSD: number) => number;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(0.92); // Default EUR/USD rate
  
  // In a real app, you would fetch the exchange rate from an API
  // For simplicity, we're using a fixed rate here
  
  const convertPrice = (priceInUSD: number): number => {
    if (currency === 'USD') return priceInUSD;
    return Number((priceInUSD * exchangeRate).toFixed(2));
  };
  
  const formatPrice = (price: number): string => {
    if (currency === 'USD') {
      return `$${price.toFixed(2)}`;
    } else {
      return `€${price.toFixed(2)}`;
    }
  };
  
  // Save currency preference to localStorage
  useEffect(() => {
    localStorage.setItem('preferredCurrency', currency);
  }, [currency]);
  
  // Load currency preference from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferredCurrency') as Currency | null;
    if (savedCurrency && (savedCurrency === 'USD' || savedCurrency === 'EUR')) {
      setCurrency(savedCurrency);
    }
  }, []);
  
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
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
