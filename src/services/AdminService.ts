
import { StockItem } from '@/data/stockItems';

// In a real application, these functions would make API calls
// to your backend (like your Flask API)

export const getStockItems = async (): Promise<StockItem[]> => {
  // In a real app: return fetch('/api/stock').then(res => res.json());
  const storedItems = localStorage.getItem('adminStockItems');
  return storedItems ? JSON.parse(storedItems) : [];
};

export const updateStockItem = async (item: StockItem): Promise<StockItem> => {
  // In a real app: return fetch(`/api/stock/${item.id}`, { 
  //   method: 'PUT', 
  //   body: JSON.stringify(item),
  //   headers: { 'Content-Type': 'application/json' }
  // }).then(res => res.json());
  
  const storedItems = localStorage.getItem('adminStockItems');
  let items = storedItems ? JSON.parse(storedItems) : [];
  
  const updatedItems = items.map((i: StockItem) => 
    i.id === item.id ? item : i
  );
  
  localStorage.setItem('adminStockItems', JSON.stringify(updatedItems));
  return item;
};

export interface StoreSettings {
  bankName: string;
  accountNumber: string;
  accountName: string;
  routingNumber: string;
  swiftCode: string;
}

export const getStoreSettings = async (): Promise<StoreSettings> => {
  // In a real app: return fetch('/api/settings').then(res => res.json());
  const storedSettings = localStorage.getItem('storeSettings');
  return storedSettings 
    ? JSON.parse(storedSettings) 
    : {
        bankName: '',
        accountNumber: '',
        accountName: '',
        routingNumber: '',
        swiftCode: ''
      };
};

export const updateStoreSettings = async (settings: StoreSettings): Promise<StoreSettings> => {
  // In a real app: return fetch('/api/settings', {
  //   method: 'PUT',
  //   body: JSON.stringify(settings),
  //   headers: { 'Content-Type': 'application/json' }
  // }).then(res => res.json());
  
  localStorage.setItem('storeSettings', JSON.stringify(settings));
  return settings;
};
