import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

// const initial = {
//   toggleTimer: false,
//   timerTimestamp: null,
//   dayTimestamp: null,
//   selectCoin: null,
//   coinTimestamp: null,
//   index: 0,
//   data: null,
// };

// export const ExchangeContext = createContext();

const select = {
  date: null,
  coin: "null",
};

export const SelectContext = createContext(select);

const SelectStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, select);

  console.log("select store");
  return (
    <SelectContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectContext.Provider>
  );
};

const timer = {
  timestamp: 0,
  isPlay: false,
};

export const TimerContext = createContext(timer);

const TimerStore = ({ children }) => {
  console.log("timer store");
  const [state, dispatch] = useReducer(reducer, timer);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export { SelectStore, TimerStore };
