
import { StockItem } from '@/data/stockItems';
import { API_BASE_URL } from '@/config/api';

// Get stock items from the backend API without localStorage fallback
export const getStockItems = async (): Promise<StockItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stock`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock items');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock items:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const getStockItemById = async (id: number): Promise<StockItem | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stock/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock item');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock item:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Function to update a stock item's images
export const updateStockItemImages = async (
  itemId: number, 
  images: { main: string; front?: string; back?: string; detail?: string }
): Promise<void> => {
  try {
    // Log the images being updated
    console.log(`Updating images for item ${itemId}:`, images);
    
    // In a real API implementation, you would have an endpoint to upload images
    // For now, we'll simulate successful update
    
    // Make sure the client-side image URLs are preserved
    const processedImages = {
      main: images.main,
      front: images.front || undefined,
      back: images.back || undefined,
      detail: images.detail || undefined
    };
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error updating stock item images:', error);
    throw error;
  }
};

// New function to update product details, specifications, and warranty info
export const updateStockItemDetails = async (
  itemId: number,
  details: {
    productDetails?: string;
    specifications?: {
      display?: string;
      performance?: string;
      camera?: string;
      battery?: string;
    };
    warrantyInfo?: string;
  }
): Promise<void> => {
  try {
    // In a real app, this would be an API call to update the details
    console.log(`Updating details for item ${itemId}:`, details);
    // For now, we'll just log the update as if it was successful
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error updating stock item details:', error);
    throw error;
  }
};
