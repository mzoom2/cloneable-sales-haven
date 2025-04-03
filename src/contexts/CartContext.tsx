import React, { createContext, useContext, useState, useEffect } from 'react';
import { StockItem } from '@/data/stockItems';
import { sendTelegramMessage } from '@/services/TelegramService';
import { useAuth } from './AuthContext';

export interface CartItem extends StockItem {
  quantity: number;
  imageUrl?: string; // Add support for product images
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: StockItem, quantity: number, imageUrl?: string) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getUniqueItemsCount: () => number;
  updateCart: (item: CartItem) => void; // Add this method
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: StockItem, quantity: number, imageUrl?: string) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        // If item exists, update its quantity
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Otherwise, add it as a new item
        updatedItems = [...prevItems, { ...item, quantity, imageUrl }];
      }

      // Send Telegram notification
      if (user) {
        const message = `🛒 <b>Product Added to Cart</b>\n\n<b>User:</b> ${user.email}\n<b>Product:</b> ${item.name}\n<b>Quantity:</b> ${quantity}\n<b>Price:</b> $${item.price * quantity}`;
        sendTelegramMessage(message).catch(console.error);
      }

      return updatedItems;
    });
  };

  // Add the updateCart method
  const updateCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // If item exists, replace it
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = item;
        return updatedItems;
      } else {
        // Otherwise, add it as a new item
        return [...prevItems, item];
      }
    });
    
    // Send Telegram notification
    if (user) {
      const message = `🛒 <b>Offer Accepted and Added to Cart</b>\n\n<b>User:</b> ${user.email}\n<b>Product:</b> ${item.name}\n<b>Quantity:</b> ${item.quantity}\n<b>Offer Price:</b> $${item.price}`;
      sendTelegramMessage(message).catch(console.error);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Method to get the count of unique items
  const getUniqueItemsCount = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      getUniqueItemsCount,
      updateCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
