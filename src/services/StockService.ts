
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

// Function to update a stock item's images by sending them to the backend
export const updateStockItemImages = async (
  itemId: number, 
  images: { main: string; front?: string; back?: string; detail?: string }
): Promise<void> => {
  try {
    console.log(`Updating images for item ${itemId}:`, images);
    
    // In a real implementation, we'd send the actual image data to the backend
    // For demonstration, we'll make a PUT request to update the image URLs
    const response = await fetch(`${API_BASE_URL}/stock/${itemId}/images`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(images)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update stock item images');
    }
    
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
    // Send details to the backend API
    const response = await fetch(`${API_BASE_URL}/stock/${itemId}/details`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update stock item details');
    }
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error updating stock item details:', error);
    throw error;
  }
};

// Function to upload an image file to the backend
export const uploadImageFile = async (file: File): Promise<string> => {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('image', file);
    
    // Send the file to the backend
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    // Get the URL of the uploaded image from the response
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
