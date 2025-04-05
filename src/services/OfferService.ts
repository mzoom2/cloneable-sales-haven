
import { StockItem } from "@/data/stockItems";

export interface Offer {
  id: number;
  productId: number;
  userId: string;
  price: number;
  quantity: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  product: StockItem;
}

export type UserOffer = Offer;

// Mock function to get offers
export const getOffers = async (): Promise<Offer[]> => {
  // This would typically be an API call
  return [
    {
      id: 1,
      productId: 1,
      userId: 'user123',
      price: 900,
      quantity: 2,
      status: 'pending',
      createdAt: '2023-04-01T10:00:00Z',
      product: {
        id: 1,
        name: "iPhone 13 Pro",
        price: 999,
        quantity: 15,
        images: {
          main: "/placeholder.svg"
        },
        description: "Slightly used iPhone 13 Pro in excellent condition"
      }
    },
    {
      id: 2,
      productId: 2,
      userId: 'user123',
      price: 750,
      quantity: 1,
      status: 'accepted',
      createdAt: '2023-03-29T14:30:00Z',
      product: {
        id: 2,
        name: "Samsung Galaxy S21",
        price: 799,
        quantity: 10,
        images: {
          main: "/placeholder.svg"
        },
        description: "Refurbished Galaxy S21 with minor cosmetic wear"
      }
    }
  ];
};

export const getUserOffers = async (userId: string): Promise<UserOffer[]> => {
  const offers = await getOffers();
  return offers.filter(offer => offer.userId === userId);
};

export const acceptOffer = async (offerId: number): Promise<boolean> => {
  console.log(`Accepting offer with ID: ${offerId}`);
  // In a real app, this would make an API call
  return true;
};

export const rejectOffer = async (offerId: number): Promise<boolean> => {
  console.log(`Rejecting offer with ID: ${offerId}`);
  // In a real app, this would make an API call
  return true;
};

export const makeOffer = async (productId: number, price: number, quantity: number): Promise<boolean> => {
  console.log(`Making offer for product ${productId} at price ${price} for quantity ${quantity}`);
  // In a real app, this would make an API call
  return true;
};
