
type Currency = 'USD' | 'EUR';

export const formatCurrency = (amount: number, currency: Currency = 'USD'): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};

export const convertCurrency = (amount: number, fromCurrency: Currency, toCurrency: Currency): number => {
  // Example conversion rates (in reality, you'd fetch these from an API)
  const conversionRates = {
    'USD_EUR': 0.85,
    'EUR_USD': 1.18
  };
  
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  const conversionKey = `${fromCurrency}_${toCurrency}` as keyof typeof conversionRates;
  const rate = conversionRates[conversionKey];
  
  return amount * rate;
};
