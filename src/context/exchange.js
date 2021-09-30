import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

const initial = {
  toggleTimer: false,
  timerTimestamp: null,
  dayTimestamp: null,
  selectCoin: null,
  coinTimestamp: null,
  index: 0,
  data: null,
};

export const ExchangeContext = createContext(null);

const ExchangeStore = (props) => {
  const [state, dispatch] = useReducer(reducer, initial);

  // console.log("exchagne store");

  return (
    <ExchangeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ExchangeContext.Provider>
  );
};
export default ExchangeStore;
