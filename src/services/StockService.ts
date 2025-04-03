
import { StockItem } from '@/data/stockItems';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5000/api';

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

// New function to update a stock item's images
export const updateStockItemImages = async (
  itemId: number, 
  images: { main: string; front?: string; back?: string; detail?: string }
): Promise<void> => {
  try {
    // In a real app, this would be an API call to update the images
    console.log(`Updating images for item ${itemId}:`, images);
    // For now, we'll just log the update as if it was successful
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error updating stock item images:', error);
    throw error;
  }
};
