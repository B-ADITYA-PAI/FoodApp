import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      // Check if item already exists in cart
      const existingItemIndex = state.findIndex(item => item.id === action.id && item.size === action.size);
      if (existingItemIndex !== -1) {
        // Item already exists, update the quantity
        const updatedState = state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, qty: item.qty + action.qty, price: item.price + action.price }
            : item
        );
        return updatedState;
      } else {
        // Item does not exist, add new item to cart
        return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
      }
    }
    case "REMOVE":
      return state.filter((item, index) => index !== action.index);
    case "DROP":
      return [];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.id && item.size === action.size
          ? { ...item, qty: action.qty, price: action.price }
          : item
      );
    default:
      console.error("Error in Reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
