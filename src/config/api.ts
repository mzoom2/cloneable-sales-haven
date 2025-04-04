
/**
 * API Configuration
 * 
 * This file contains configuration for API endpoints.
 * You can change the BASE_URL to point to your hosted backend.
 */

// The base URL for all API requests
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elaborate-bruised-embeds-mzoomolabewa.replit.app/api';

// Helper function to build full API URLs
export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Export a debug function to help troubleshoot API issues
export const debugApiConnection = async (): Promise<boolean> => {
  try {
    console.log(`Attempting to connect to API at: ${API_BASE_URL}/ping`);
    
    const response = await fetch(`${API_BASE_URL}/ping`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit' // Don't send cookies to avoid CORS preflight issues
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('API connection successful!', data);
      return true;
    } else {
      console.error(`API connection failed with status: ${response.status}`);
      console.error(`Response text: ${await response.text()}`);
      return false;
    }
  } catch (error) {
    console.error('API connection error:', error);
    return false;
  }
};
