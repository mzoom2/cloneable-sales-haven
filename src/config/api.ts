
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
