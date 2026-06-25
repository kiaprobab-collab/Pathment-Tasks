import { createContext, useContext, useState } from "react";

// 1. Context Creation
export const CardContext = createContext();

// Custom hook
export const useCardContext = () => {
  return useContext(CardContext);
};

// 2. Context Provider
export const CardContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if(existingItem){
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const value = {
    getTotalPrice,
    cartItems,
    addItem,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
