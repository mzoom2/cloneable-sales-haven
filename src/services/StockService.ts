
import { stockItems as initialStockItems, StockItem } from '@/data/stockItems';

// Get stock items from either localStorage (if admin has modified them)
// or from the initial data
export const getStockItems = (): StockItem[] => {
  const storedItems = localStorage.getItem('adminStockItems');
  return storedItems ? JSON.parse(storedItems) : initialStockItems;
};

export const getStockItemById = (id: number): StockItem | undefined => {
  const items = getStockItems();
  return items.find(item => item.id === id);
};
