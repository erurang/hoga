import { useState, useEffect, useMemo, useContext } from "react";
import TimerButton from "./timerButton";

import {
  BaseContext,
  OrderBookIndexContext,
  TickerIndexContext,
  TradeIndexContext,
} from "../../context/exchange/exchange";
import actionType from "../../context/exchange/action";
import ErrorPopUP from "../error";

const Timer = () => {
  const { state, dispatch } = useContext(BaseContext);

  const { state: tradeIndex, dispatch: tradeDispatch } =
    useContext(TradeIndexContext);

  const { state: tickerIndex, dispatch: tickerDispatch } =
    useContext(TickerIndexContext);

  const { state: orderbookIndex, dispatch: orderbookDispatch } = useContext(
    OrderBookIndexContext
  );

  const {
    hoga: { timestamp, orderbook },
    trade: { trade_timestamp },
    ticker: { tic_trade_timestamp },
  } = state;

  const newDate = useMemo(() => new Date(state.date), [state.date]);

  const [time, setTime] = useState({
    hours: newDate.getHours(),
    minutes: newDate.getMinutes(),
    seconds: newDate.getSeconds(),
    milliseconds: newDate.getMilliseconds(),
    timestamp: +newDate,
  });

  const [isPlay, setIsPlay] = useState(false);

  function handlePlusTimerButton(num) {
    setIsPlay(false);
    const number = +num.target.innerText;

    let plusTime = 0;

    if (number === 1) plusTime = 10000;
    else if (number === 5) plusTime = 300000;
    else if (number === 10) plusTime = 600000;
    else if (number === 30) plusTime = 1800000;

    const newDate = new Date(time.timestamp + plusTime);

    // 이거 수정해야함. => plusTIme을 한번더한 실수 수정
    const update = timestamp.findIndex((t) => {
      return t >= +newDate;
    });

    if (update !== -1) {
      setTime({
        hours: newDate.getHours(),
        minutes: newDate.getMinutes(),
        seconds: newDate.getSeconds(),
        milliseconds: newDate.getMilliseconds(),
        timestamp: +newDate,
      });
      // setOrderbookIndex(update);
      dispatch({ type: actionType.CLICK_MINUTES_BUTTON, update });
    } else {
      // 1. 범위 9시~담날 9시 timestamp로 확인후 없으면 팝업후 리턴 만들기
      dispatch({ type: actionType.ERROR_POPUP });
    }
  }

  useEffect(() => {
    if (!isPlay) return;
    else if (
      trade_timestamp.length - 1 === tradeIndex ||
      orderbook.length - 1 === orderbookIndex
    ) {
      console.log("길이넘음");
      setIsPlay(false);
      dispatch({ type: actionType.ERROR_POPUP });
      return;
    }

    const interval = setInterval(() => {
      setTime({
        ...time,
        milliseconds: time.milliseconds + 1,
        timestamp: time.timestamp + 10,
      });
    }, 10);

    if (time.milliseconds >= 99) {
      setTime({
        ...time,
        milliseconds: 0,
        seconds: time.seconds + 1,
      });
    } else if (time.seconds >= 60) {
      setTime({
        ...time,
        seconds: 0,
        minutes: time.minutes + 1,
      });
    } else if (time.minutes >= 60) {
      setTime({
        ...time,
        minutes: 0,
        hours: time.hours + 1,
      });
    }

    // update orderbook
    if (time.timestamp >= timestamp[orderbookIndex]) {
      // console.log("index 설정됨 : ", index);
      orderbookDispatch({ type: actionType.SET_ORDERBOOK_INDEX });
    }

    // update trade
    if (time.timestamp >= trade_timestamp[tradeIndex]) {
      // console.log("trade index 설정됨 : ", tradeIndex);

      // const update = trade_timestamp.findIndex((t) => {
      //   return t >= time.timestamp;
      // });
      // // -1 만큼 업데이트 (버튼누를시에.)
      // console.log("update", update);

      // setTradeIndex((prev) => prev + 1);
      tradeDispatch({ type: actionType.SET_TRADE_INDEX });
    }

    // update tic

    if (time.timestamp >= tic_trade_timestamp[tickerIndex]) {
      // console.log("ticker index 설정됨 : ", tickerIndex);
      tickerDispatch({ type: actionType.SET_TICKER_INDEX });
    }

    return () => clearInterval(interval);
  }, [isPlay, time]);

  return (
    <>
      {state?.error ? (
        <ErrorPopUP message={"데이터가 존재하지 않습니다."} />
      ) : null}

      <div>
        <h1>
          {tradeIndex},{orderbookIndex},{tickerIndex}
        </h1>
        {time.hours < 10 ? `0${time.hours}` : time.hours}:
        {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
        {time.seconds < 10 ? `0${time.seconds}` : time.seconds}:
        {time.milliseconds < 10 ? `0${time.milliseconds}` : time.milliseconds}
        <div>
          <button onClick={() => setIsPlay((prev) => !prev)}>play</button>
          <TimerButton
            number={1}
            handlePlusTimerButton={handlePlusTimerButton}
          />
          <TimerButton
            number={5}
            handlePlusTimerButton={handlePlusTimerButton}
          />
          <TimerButton
            number={10}
            handlePlusTimerButton={handlePlusTimerButton}
          />
          <TimerButton
            number={30}
            handlePlusTimerButton={handlePlusTimerButton}
          />
        </div>
      </div>
    </>
  );
};

export default Timer;
