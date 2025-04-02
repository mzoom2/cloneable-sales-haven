export interface StockItem {
  id: number;
  name: string;
  price: number;
  location: string;
  grade: string;
  imageUrl?: string; // Add this line to fix the type error
}
