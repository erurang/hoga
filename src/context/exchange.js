import React, { createContext } from "react";
import coin from "../db/sample.json";

const initialState = {
  timestamp: Object.values(coin.timestamp),
  orderbook: Object.values(coin.orderbook_units),
  total_ask_size: Object.values(coin.total_ask_size),
  total_bid_size: Object.values(coin.total_bid_size),
};

const number = 0;
const isPlay = false;

export const ExchangeContext = createContext();
export const ExchangeIndexContext = createContext();
export const ExchangePlayContext = createContext();

const day = +new Date("2021-09-26 09:00:00");
export const ExchangeDayContext = createContext();

const ExchangeStore = (props) => {
  return (
    <ExchangeContext.Provider value={initialState}>
      <ExchangeIndexContext.Provider value={number}>
        <ExchangePlayContext.Provider value={isPlay}>
          <ExchangeDayContext.Provider value={day}>
            {props.children}
          </ExchangeDayContext.Provider>
        </ExchangePlayContext.Provider>
      </ExchangeIndexContext.Provider>
    </ExchangeContext.Provider>
  );
};
export default ExchangeStore;
