
import { stockItems as initialStockItems, StockItem } from '@/data/stockItems';

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
    
    // Fallback to localStorage or initial data if API call fails
    const storedItems = localStorage.getItem('adminStockItems');
    return storedItems ? JSON.parse(storedItems) : initialStockItems;
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
    
    // Fallback to local method if API call fails
    const items = await getStockItems();
    return items.find(item => item.id === id);
  }
};
