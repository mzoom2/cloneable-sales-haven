
export interface StockItem {
  id: number;
  name: string;
  price: number;
  location: string;
  grade: string;
  quantity?: number; // Add quantity as optional property
  imageUrl?: string;
}
