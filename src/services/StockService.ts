
import { StockItem } from '@/data/stockItems';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5000/api';

// Get stock items from the backend API
export const getStockItems = async (): Promise<StockItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stock`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock items');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock items:', error);
    
    // Return empty array if API call fails
    return [];
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
    return undefined;
  }
};
