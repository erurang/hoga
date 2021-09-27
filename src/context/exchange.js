import React, { createContext } from "react";

export const ExchangeContext = createContext();

const ExchangeStore = (props) => {
  const exchange = {
    date: null,
    selectCoin: false,
    loading: true,
    data: false,
    error: null,
    timestamp: null,
    isPlay: false,
  };

  return (
    <ExchangeContext.Provider value={exchange}>
      {props.children}
    </ExchangeContext.Provider>
  );
};

export default ExchangeStore;
