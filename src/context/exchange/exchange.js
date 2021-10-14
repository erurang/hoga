import React, { createContext, useCallback, useReducer } from "react";
import reducer from "./reducer";

const base = {
  date: null,
  coin: "AXS",
  error: false,
  loading: true,
  hoga: {},
  trade: {},
  ticker: {},
};

const orderbookIndex = 0;
const tradeIndex = 0;
const tickerIndex = 0;
const isPlay = false;

export const BaseContext = createContext();
export const OrderBookIndexContext = createContext();
export const TradeIndexContext = createContext();
export const TickerIndexContext = createContext();
export const IsPlayContext = createContext();

// excahnge

const IsPlayStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, isPlay);

  return (
    <IsPlayContext.Provider value={{ state, dispatch }}>
      {children}
    </IsPlayContext.Provider>
  );
};

const OrderbookIndexStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, orderbookIndex);

  // console.log("orderbookStore", state);
  return (
    <OrderBookIndexContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderBookIndexContext.Provider>
  );
};

const TradeIndexStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, tradeIndex);

  // console.log("tradeStore", state);
  return (
    <TradeIndexContext.Provider value={{ state, dispatch }}>
      {children}
    </TradeIndexContext.Provider>
  );
};

const TickerIndexStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, tickerIndex);

  // console.log("TickerStore", state);
  return (
    <TickerIndexContext.Provider value={{ state, dispatch }}>
      {children}
    </TickerIndexContext.Provider>
  );
};

const BaseStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, base);

  // console.log("baseStore");
  return (
    <BaseContext.Provider value={{ state, dispatch }}>
      <TradeIndexStore>
        <OrderbookIndexStore>
          <TickerIndexStore>
            <IsPlayStore>{children}</IsPlayStore>
          </TickerIndexStore>
        </OrderbookIndexStore>
      </TradeIndexStore>
    </BaseContext.Provider>
  );
};

export { BaseStore };
