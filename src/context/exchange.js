import React, { createContext } from "react";
import coin from "../db/sample.json";

// const initialState = {
//   timestamp: Object.values(coin.timestamp),
//   orderbook: Object.values(coin.orderbook_units),
//   total_ask_size: Object.values(coin.total_ask_size),
//   total_bid_size: Object.values(coin.total_bid_size),
// };

// 타이머
const toggleTimerState = false;
export const ToggleTimerContext = createContext();

// 타이머 타임스탬프
const timerTimestampState = createContext();
export const TimerTimerstampContext = createContext();

// 날짜
const dayState = null;
export const SelectDayContext = createContext();

// 코인선택
const coinState = null;
export const SelectCoinContext = createContext();

const ExchangeStore = (props) => {
  return (
    <SelectDayContext.Provider value={dayState}>
      <SelectCoinContext.Provider value={coinState}>
        <ToggleTimerContext.Provider value={toggleTimerState}>
          <TimerTimerstampContext.Provider value={timerTimestampState}>
            {props.children}
          </TimerTimerstampContext.Provider>
        </ToggleTimerContext.Provider>
      </SelectCoinContext.Provider>
    </SelectDayContext.Provider>
  );
};
export default ExchangeStore;
