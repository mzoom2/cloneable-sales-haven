
import { StockItem } from '@/data/stockItems';

export interface Offer {
  id: string;
  product: string;
  offeredPrice: string;
  offeredQuantity: number;
  productId: string; // This is defined as string in the interface
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
    productId: stockItem.id.toString(), // Convert number to string to match the interface
    offeredPrice: price,
    offeredQuantity: quantity,
    status: "pending",
    createdAt: new Date()
  };
  
  const updatedOffers = [...offers, newOffer];
  localStorage.setItem('offers', JSON.stringify(updatedOffers));
  
  // Set a timer to auto-accept this offer after 3 minutes (demo purpose)
  setOfferAcceptanceTimer(newOffer.id);
  
  return newOffer;
};

// Remove an offer
export const removeOffer = (offerId: string): void => {
  let offers = getOffers();
  offers = offers.filter(offer => offer.id !== offerId);
  localStorage.setItem('offers', JSON.stringify(offers));
};

// Update an offer's status
export const updateOfferStatus = (offerId: string, status: "pending" | "accepted" | "rejected"): Offer | null => {
  let offers = getOffers();
  const offerIndex = offers.findIndex(offer => offer.id === offerId);
  
  if (offerIndex >= 0) {
    offers[offerIndex] = {
      ...offers[offerIndex],
      status
    };
    
    localStorage.setItem('offers', JSON.stringify(offers));
    return offers[offerIndex];
  }
  
  return null;
};

// Get a specific offer by ID
export const getOfferById = (offerId: string): Offer | null => {
  const offers = getOffers();
  return offers.find(offer => offer.id === offerId) || null;
};

// Set a timer to automatically accept an offer after 3 minutes
const setOfferAcceptanceTimer = (offerId: string): void => {
  // Store the timer ID in localStorage so it persists across page refreshes
  const timers = JSON.parse(localStorage.getItem('offerTimers') || '{}');
  
  // Set timer to 3 minutes (180000 ms)
  const timeoutId = setTimeout(() => {
    const updatedOffer = updateOfferStatus(offerId, "accepted");
    if (updatedOffer) {
      // Set a flag in localStorage that indicates an offer was accepted
      localStorage.setItem('lastAcceptedOffer', offerId);
      localStorage.setItem('offerAcceptedAt', new Date().toISOString());
      
      // Dispatch a custom event that can be listened to in any component
      window.dispatchEvent(new CustomEvent('offerAccepted', { detail: { offerId } }));
    }
    
    // Clean up timer reference
    const currentTimers = JSON.parse(localStorage.getItem('offerTimers') || '{}');
    delete currentTimers[offerId];
    localStorage.setItem('offerTimers', JSON.stringify(currentTimers));
  }, 180000); // 3 minutes
  
  // Store timestamp when this offer should be accepted
  const acceptanceTime = new Date();
  acceptanceTime.setMinutes(acceptanceTime.getMinutes() + 3);
  
  timers[offerId] = {
    acceptanceTime: acceptanceTime.toISOString()
  };
  
  localStorage.setItem('offerTimers', JSON.stringify(timers));
};

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
