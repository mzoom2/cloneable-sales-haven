import { StockItem } from '@/data/stockItems';
import { API_BASE_URL } from '@/config/api';

export const getStockItems = async (): Promise<StockItem[]> => {
  try {
    // Make a real API call to the Flask backend
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

export const updateStockItem = async (item: StockItem): Promise<StockItem> => {
  try {
    // Make a real API call to update the item
    const response = await fetch(`${API_BASE_URL}/stock/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update stock item');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating stock item:', error);
    throw error; // Re-throw the error instead of using localStorage
  }
};

// Add a new stock item without localStorage fallback
export const addStockItem = async (item: Omit<StockItem, 'id'>): Promise<StockItem> => {
  try {
    // Make a real API call to add the item
    const response = await fetch(`${API_BASE_URL}/stock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    
    if (!response.ok) {
      throw new Error('Failed to add stock item');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding stock item:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Add new delete function for stock items
export const deleteStockItem = async (itemId: number): Promise<void> => {
  try {
    // Make a real API call to delete the item
    const response = await fetch(`${API_BASE_URL}/stock/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete stock item');
    }
  } catch (error) {
    console.error('Error deleting stock item:', error);
    throw error;
  }
};

export interface StoreSettings {
  bankName: string;
  accountNumber: string;
  accountName: string;
  routingNumber: string;
  swiftCode: string;
}

export const getStoreSettings = async (): Promise<StoreSettings> => {
  try {
    // Make a real API call to get store settings
    const response = await fetch(`${API_BASE_URL}/settings`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch store settings');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching store settings:', error);
    throw error; // Re-throw the error instead of using localStorage
  }
};

export const updateStoreSettings = async (settings: StoreSettings): Promise<StoreSettings> => {
  try {
    // Make a real API call to update store settings
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update store settings');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating store settings:', error);
    throw error; // Re-throw the error instead of using localStorage
  }
};

export const importStockItems = async (items: StockItem[]): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/import-stock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    });
    
    if (!response.ok) {
      throw new Error('Failed to import stock items');
    }
  } catch (error) {
    console.error('Error importing stock items:', error);
    throw error; // Re-throw the error instead of using localStorage
  }
};
