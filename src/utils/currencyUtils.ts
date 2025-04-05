
/**
 * Formats a currency value based on the provided currency code
 * @param amount The amount to format
 * @param currency The currency code (USD or EUR)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: 'USD' | 'EUR'): string => {
  const formatter = new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'de-DE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};
