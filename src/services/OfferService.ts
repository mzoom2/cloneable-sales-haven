
import { StockItem } from '@/data/stockItems';

export interface Offer {
  id: string;
  product: string;
  offeredPrice: string;
  offeredQuantity: number;
  productId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

// Get offers from localStorage
export const getOffers = (): Offer[] => {
  const offersData = localStorage.getItem('offers');
  if (!offersData) return [];
  
  const parsedOffers = JSON.parse(offersData);
  return parsedOffers.map((offer: Offer) => ({
    ...offer,
    createdAt: new Date(offer.createdAt)
  }));
};

// Add a new offer
export const addOffer = (stockItem: StockItem, quantity: number, price: string): Offer => {
  const offers = getOffers();
  
  const newOffer: Offer = {
    id: generateId(),
    product: stockItem.name,
    productId: stockItem.id,
    offeredPrice: price,
    offeredQuantity: quantity,
    status: "pending",
    createdAt: new Date()
  };
  
  const updatedOffers = [...offers, newOffer];
  localStorage.setItem('offers', JSON.stringify(updatedOffers));
  
  return newOffer;
};

// Remove an offer
export const removeOffer = (offerId: string): void => {
  let offers = getOffers();
  offers = offers.filter(offer => offer.id !== offerId);
  localStorage.setItem('offers', JSON.stringify(offers));
};

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
