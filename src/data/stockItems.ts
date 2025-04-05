export interface StockItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: {
    main: string;
    additional?: string[];
  };
  description?: string;
  specs?: Record<string, string>;
  grade?: string;
  location?: string;
  category?: string;
  model?: string;
}
