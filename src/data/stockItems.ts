export interface StockItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  location: string;
  grade: string; // Changed from union type to any string
}

export const stockItems: StockItem[] = [
  {
    id: 1,
    name: 'Unlocked iPhone 15 Pro 256GB Mix Color (e-sim) (A+/A Grade)',
    quantity: 351,
    price: 697.00,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 2,
    name: 'Unlocked iPhone 15 Pro Max 256GB Mix Color (e-sim) (A+/A Grade)',
    quantity: 430,
    price: 838.00,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 3,
    name: 'Unlocked iPhone 14 Pro Max 128GB Mix Color (Dual Physical SIM) (A+/A Grade)',
    quantity: 508,
    price: 591.50,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 4,
    name: 'Unlocked iPhone 14 Pro Max 256GB Mix Color (Dual Physical SIM) (A+/A Grade)',
    quantity: 418,
    price: 633.80,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 5,
    name: 'Unlocked iPhone 14 Pro Max 128GB Mix Color (EU) (A+/A Grade)',
    quantity: 411,
    price: 605.60,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 6,
    name: 'Unlocked iPhone 14 Pro Max 256GB Mix Color (EU) (A+/A Grade)',
    quantity: 447,
    price: 647.90,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 7,
    name: 'Unlocked iPhone 14 128GB Mix Color (Physical SIM + eSIM) (A++ Grade)',
    quantity: 500,
    price: 662.00,
    location: 'HongKong',
    grade: 'A++'
  },
  {
    id: 8,
    name: 'Unlocked iPhone 14 256GB Mix Color (Physical SIM + eSIM) (A++ Grade)',
    quantity: 570,
    price: 718.30,
    location: 'HongKong',
    grade: 'A++'
  },
  {
    id: 9,
    name: 'Unlocked iPhone 14 Plus 128GB Mix Color (physical sim) (A++ Grade)',
    quantity: 600,
    price: 704.20,
    location: 'HongKong',
    grade: 'A++'
  },
  {
    id: 10,
    name: 'Unlocked iPhone 14 Plus 256GB Mix Color (physical sim) (A++ Grade)',
    quantity: 460,
    price: 774.60,
    location: 'HongKong',
    grade: 'A++'
  },
  {
    id: 11,
    name: 'Unlocked iPhone 13 Pro 256GB Mix Color (e-sim) (A+/A Grade)',
    quantity: 325,
    price: 597.00,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 12,
    name: 'Unlocked iPhone 13 Pro Max 256GB Mix Color (e-sim) (A+/A Grade)',
    quantity: 380,
    price: 738.00,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 13,
    name: 'Unlocked iPhone 13 Pro Max 128GB Mix Color (Dual Physical SIM) (A+/A Grade)',
    quantity: 408,
    price: 491.50,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 14,
    name: 'Unlocked iPhone 13 Pro Max 256GB Mix Color (Dual Physical SIM) (A+/A Grade)',
    quantity: 318,
    price: 533.80,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 15,
    name: 'Unlocked iPhone 13 Pro Max 128GB Mix Color (EU) (A+/A Grade)',
    quantity: 311,
    price: 505.60,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 16,
    name: 'Unlocked iPhone 13 Pro Max 256GB Mix Color (EU) (A+/A Grade)',
    quantity: 347,
    price: 547.90,
    location: 'HongKong',
    grade: 'A+/A'
  },
  {
    id: 17,
    name: 'Unlocked iPhone 13 128GB Mix Color (Physical SIM + eSIM) (A++ Grade)',
    quantity: 400,
    price: 562.00,
    location: 'HongKong',
    grade: 'A++'
  },
  {
    id: 18,
    name: 'Unlocked iPhone 13 256GB Mix Color (Physical SIM + eSIM) (A++ Grade)',
    quantity: 470,
    price: 618.30,
    location: 'HongKong',
    grade: 'A++'
  },
  {
    id: 19,
    name: 'Unlocked iPhone 13 Plus 128GB Mix Color (physical sim) (A++ Grade)',
    quantity: 500,
    price: 604.20,
    location: 'HongKong',
    grade: 'A++'
  },
  {
    id: 20,
    name: 'Unlocked iPhone 13 Plus 256GB Mix Color (physical sim) (A++ Grade)',
    quantity: 360,
    price: 674.60,
    location: 'HongKong',
    grade: 'A++'
  },
];
