import React, { createContext, useReducer } from "react";
import coin from "../db/sample.json";
import reducer from "./reducer";

// const initialState = {
//   timestamp: Object.values(coin.timestamp),
//   orderbook: Object.values(coin.orderbook_units),
//   total_ask_size: Object.values(coin.total_ask_size),
//   total_bid_size: Object.values(coin.total_bid_size),
// };

const initial = {
  toggleTimer: false,
  timerTimestamp: null,
  dayTimestamp: null,
  selectCoin: null,
};

export const ExchangeContext = createContext(null);

const ExchangeStore = (props) => {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <ExchangeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ExchangeContext.Provider>
  );
};
export default ExchangeStore;
