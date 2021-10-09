import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

const base = {
  date: null,
  coin: "AXS",
  error: null,
  loading: true,
  hoga: {},
  trade: {},
  ticker: {},
};

export const BaseContext = createContext(base);

const BaseStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, base);

  console.log("baseStore");
  return (
    <BaseContext.Provider value={{ state, dispatch }}>
      {children}
    </BaseContext.Provider>
  );
};

export { BaseStore };
