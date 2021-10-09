import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import CoinTitle from "./coinTitle";
import OrderBook from "./orderbook";
import TimerButton from "./timerButton";
import Trade from "./trade";
import LightChart from "./lightChart";
import { BaseContext } from "../context/exchange/exchange";
import actionType from "../context/exchange/action";
import ErrorPopUP from "./error";

const Timer = () => {
  const { state, dispatch } = useContext(BaseContext);

  const {
    hoga: { timestamp, orderbook },
    trade: { trade_timestamp },
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
  const [index, setIndex] = useState(0);

  const [tradeIndex, setTradeIndex] = useState(0);

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
      setIndex(update);
    } else {
      // 1. 범위 9시~담날 9시 timestamp로 확인후 없으면 팝업후 리턴 만들기
      dispatch({ type: actionType.ERROR_POPUP });
    }
  }

  useEffect(() => {
    if (!isPlay) return;
    else if (
      trade_timestamp.length - 1 === tradeIndex ||
      orderbook.length - 1 === index
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
    }

    if (time.seconds >= 60) {
      setTime({
        ...time,
        seconds: 0,
        minutes: time.minutes + 1,
      });
    }

    if (time.minutes >= 60) {
      setTime({
        ...time,
        minutes: 0,
        hours: time.hours + 1,
      });
    }

    // update orderbook
    if (time.timestamp >= timestamp[index]) {
      setIndex((prev) => prev + 1);
    }

    return () => clearInterval(interval);
  }, [isPlay, time]);

  return (
    <>
      {state?.error ? (
        <ErrorPopUP message={"데이터가 존재하지 않습니다."} />
      ) : null}
      <CoinTitle index={index} />
      <div style={{ display: "flex" }}>
        <div>
          <OrderBook index={index} />
          <div>
            {time.hours < 10 ? `0${time.hours}` : time.hours}:
            {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
            {time.seconds < 10 ? `0${time.seconds}` : time.seconds}:
            {time.milliseconds < 10
              ? `0${time.milliseconds}`
              : time.milliseconds}
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
          <Trade
            timestamp={time.timestamp}
            isPlay={isPlay}
            tradeIndex={tradeIndex}
            setTradeIndex={setTradeIndex}
          />
        </div>
        <LightChart timerTimestamp={time.timestamp} />
      </div>
    </>
  );
};

export default Timer;
