import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Equipment {
  equipmentId: string;
  name: string;
  price: number;
  image?: string;
}

export interface CartItem {
  equipmentId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (equipment: Equipment) => void;
  removeFromCart: (equipmentId: string) => void;
  updateQuantity: (equipmentId: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  isInCart: (equipmentId: string) => boolean;
  getCartItem: (equipmentId: string) => CartItem | undefined;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (equipment: Equipment) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.equipmentId === equipment.equipmentId);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.equipmentId === equipment.equipmentId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { ...equipment, quantity: 1 }];
    });
  };

  const removeFromCart = (equipmentId: string) => {
    setCart(prevCart => prevCart.filter(item => item.equipmentId !== equipmentId));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prevCart => prevCart.map(item => 
      item.equipmentId === id
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getCartCount = (): number => {
    return cart.length;
  };

  const isInCart = (equipmentId: string): boolean => {
    return cart.some(item => item.equipmentId === equipmentId);
  };

  const getCartItem = (equipmentId: string): CartItem | undefined => {
    return cart.find(item => item.equipmentId === equipmentId);
  };

  const getTotalPrice = (): number => {
    if (!cart || cart.length === 0) {
      return 0;
    }
    
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : 0;
      const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
      return total + (price * quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      isInCart,
      getCartItem,
      getTotalPrice
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