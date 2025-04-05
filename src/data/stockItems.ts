
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
  productDetails?: string;
  specifications?: Record<string, string>;
  warrantyInfo?: string;
}

// Sample stock items data for testing and development
export const stockItems: StockItem[] = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    price: 999,
    quantity: 15,
    grade: "A+",
    location: "USA",
    category: "iphone",
    model: "13",
    images: {
      main: "/placeholder.svg"
    },
    description: "Slightly used iPhone 13 Pro in excellent condition"
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 799,
    quantity: 10,
    grade: "A",
    location: "Germany",
    category: "samsung",
    model: "s21",
    images: {
      main: "/placeholder.svg"
    },
    description: "Refurbished Galaxy S21 with minor cosmetic wear"
  },
  {
    id: 3,
    name: "iPhone 12",
    price: 699,
    quantity: 20,
    grade: "B+",
    location: "UK",
    category: "iphone",
    model: "12",
    images: {
      main: "/placeholder.svg"
    },
    description: "Used iPhone 12 in good working condition"
  },
  {
    id: 4,
    name: "iPhone 11 Pro Max",
    price: 599,
    quantity: 8,
    grade: "A",
    location: "France",
    category: "iphone",
    model: "11",
    images: {
      main: "/placeholder.svg"
    },
    description: "Barely used iPhone 11 Pro Max with all accessories"
  },
  {
    id: 5,
    name: "Samsung Galaxy S20",
    price: 599,
    quantity: 12,
    grade: "A-",
    location: "USA",
    category: "samsung",
    model: "s20",
    images: {
      main: "/placeholder.svg"
    },
    description: "Refurbished S20 with slight screen wear"
  }
];
