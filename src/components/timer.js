import { useState, useEffect, useMemo, useCallback } from "react";
import CoinTitle from "./coinTitle";
import OrderBook from "./orderbook";
import TimerButton from "./timerButton";
import Trade from "./trade";

const Timer = ({
  coinName,
  date,
  timestamp,
  orderbook,
  total_ask_size,
  total_bid_size,
  // trade
  ask_bid,
  change,
  change_price,
  prev_closing_price,
  trade_price,
  trade_timestamp,
  trade_volume,
  // ticker
}) => {
  const newDate = useMemo(() => new Date(date), [date]);

  // 여기서 날짜의 타임스탬프도 가지고있고,
  // 타이머의 타임스탬프도 가지고있고,
  // 데이터도 가지고있고
  // 전역으로 상태를 관리할 필요가 없어진다.

  const [time, setTime] = useState({
    hours: newDate.getHours(),
    minutes: newDate.getMinutes(),
    seconds: newDate.getSeconds(),
    milliseconds: newDate.getMilliseconds(),
    timestamp: +newDate,
  });

  // console.log(time.timestamp);

  const [isPlay, setIsPlay] = useState(false);
  const [index, setIndex] = useState(0);

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
    }
  }

  useEffect(() => {
    if (!isPlay) return;

    const interval = setInterval(() => {
      setTime({
        ...time,
        milliseconds: time.milliseconds + 1,
        timestamp: time.timestamp + 10,
      });
    }, 10);

    // useState의 렌더링 순서가 어떻게 되는지 공부해볼것!!
    // 페인팅부터 어떻게하는가에대해..

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

  // console.log(
  //   new Date(time.timestamp),
  //   time.timestamp,
  //   new Date(timestamp[index]),
  //   timestamp[index]
  // );

  function test() {
    setIsPlay((prev) => !prev);
  }

  return (
    <>
      <CoinTitle
        prev_closing_price={prev_closing_price}
        change={change}
        change_price={change_price}
        coinName={coinName}
        index={index}
      />
      <h1>
        {time.hours < 10 ? `0${time.hours}` : time.hours}:
        {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
        {time.seconds < 10 ? `0${time.seconds}` : time.seconds}:
        {time.milliseconds < 10 ? `0${time.milliseconds}` : time.milliseconds}
      </h1>
      <button onClick={() => test()}>play</button>
      <TimerButton number={1} handlePlusTimerButton={handlePlusTimerButton} />
      <TimerButton number={5} handlePlusTimerButton={handlePlusTimerButton} />
      <TimerButton number={10} handlePlusTimerButton={handlePlusTimerButton} />
      <TimerButton number={30} handlePlusTimerButton={handlePlusTimerButton} />
      <div style={{ display: "flex" }}>
        <OrderBook
          index={index}
          orderbook={orderbook}
          total_ask_size={total_ask_size}
          total_bid_size={total_bid_size}
          prev_closing_price={prev_closing_price}
          trade_price={trade_price}
        />
        <Trade
          ask_bid={ask_bid}
          prev_closing_price={prev_closing_price}
          trade_price={trade_price}
          trade_timestamp={trade_timestamp}
          trade_volume={trade_volume}
          timestamp={time.timestamp}
        />
      </div>
    </>
  );
};

export default Timer;
