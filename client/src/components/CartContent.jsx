import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    console.log('Adding to cart:', item); // Debug log
    setCart((prev) => {
      console.log('Previous cart:', prev); // Debug log
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const updatedCart = prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
        console.log('Updated cart (existing item):', updatedCart); // Debug log
        return updatedCart;
      }
      const newCart = [...prev, { ...item, quantity: 1 }];
      console.log('New cart (new item):', newCart); // Debug log
      
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    console.log('Removing from cart:', id); // Debug log
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    console.log('Updating quantity:', id, quantity); // Debug log
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
