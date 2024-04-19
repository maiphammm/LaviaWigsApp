// CartContext.js

import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const addItemToCart = (item) => {
    // Implement logic to add item to cart
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
        // Item already exists in the cart, increase its quantity
        const updatedCartItems = cartItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        setCartItems(updatedCartItems);
    } else {
        // Item does not exist in the cart, add it with quantity 1
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (itemId) => {
    // Implement logic to increase quantity of item in cart
    const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const reduceQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) }
        : cartItem
    );
    setCartItems(updatedCartItems.filter((item) => item.quantity > 0));
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
    setCartItems(updatedCartItems);
    updateTotalPriceAndItems(); // Update total price and items after removing item
  };

  const updateTotalPriceAndItems = () => {
    const newTotalPrice = cartItems.reduce((total, item) => total + item.quantity*item.totalItemPrice, 0);
    const newTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log("New Total Price:", newTotalPrice);
    console.log("New Total Items:", newTotalItems);
    setTotalPrice(newTotalPrice);
    setTotalItems(newTotalItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addItemToCart,
        removeItem,
        increaseQuantity,
        reduceQuantity,
        updateTotalPriceAndItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
