import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return [];
};

export const CartProvider = ({ children }) => {
  // Initialize state directly from localStorage
  const [cartItems, setCartItems] = useState(() => loadCartFromStorage());
  const isInitialMount = useRef(true);

  // Load cart from localStorage on mount (in case it changed)
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    // Only update if savedCart is different from current cartItems
    const currentCartStr = JSON.stringify(cartItems);
    const savedCartStr = JSON.stringify(savedCart);
    if (currentCartStr !== savedCartStr) {
      setCartItems(savedCart);
    }
    isInitialMount.current = false;
  }, []);

  // Listen for storage events (when cart is updated in another tab/window)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cart' && !isInitialMount.current) {
        const savedCart = loadCartFromStorage();
        setCartItems(savedCart);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Skip saving on initial mount to avoid overwriting with empty array
    if (!isInitialMount.current) {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, ringSize = '', color = '') => {
    const cartItem = {
      id: product._id || product.id,
      productId: product._id || product.id,
      name: product.productName || product.name,
      price: product.salePrice || product.originalPrice,
      originalPrice: product.originalPrice,
      salePrice: product.salePrice,
      image: product.images && product.images.length > 0 ? product.images[0] : '',
      quantity,
      ringSize,
      color,
    };

    setCartItems(prevItems => {
      // Check if item already exists with same ringSize and color
      const existingItemIndex = prevItems.findIndex(
        item => item.id === cartItem.id && 
        item.ringSize === cartItem.ringSize && 
        item.color === cartItem.color
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, cartItem];
      }
    });
  };

  const removeFromCart = (itemId, ringSize = '', color = '') => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === itemId && item.ringSize === ringSize && item.color === color)
      )
    );
  };

  const updateQuantity = (itemId, newQuantity, ringSize = '', color = '') => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, ringSize, color);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.ringSize === ringSize && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

