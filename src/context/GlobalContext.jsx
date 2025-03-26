import { useEffect, useReducer, createContext } from "react";

export const GlobalContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  totalPrice: 0,
  totalAmount: 0,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, payload],
      };

    case "INCREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload ? { ...item, amount: item.amount + 1 } : item
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload ? { ...item, amount: item.amount - 1 } : item
        ),
      };

    case "DELETE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      };

    case "CALCULATE_TOTAL":
      const { totalAmount, totalPrice } = state.cart.reduce(
        (acc, item) => {
          acc.totalAmount += item.amount;
          acc.totalPrice += item.price * item.amount;
          return acc;
        },
        { totalAmount: 0, totalPrice: 0 }
      );
      return { ...state, totalAmount, totalPrice };

    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL" });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
