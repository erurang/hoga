import { useState, useEffect, useMemo } from "react";
import actionType from "../context/exchange/action";
import OrderBook from "./orderbook";
import TimerButton from "./timerButton";

const Timer = ({
  date,
  timestamp,
  orderbook,
  total_ask_size,
  total_bid_size,
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

    if (number === 1) plusTime = 5000;
    else if (number === 5) plusTime = 300000;
    else if (number === 10) plusTime = 600000;
    else if (number === 30) plusTime = 1800000;

    const newDate = new Date(time.timestamp + plusTime);

    const update = timestamp.findIndex((t) => {
      return t >= +newDate + plusTime;
    });

    console.log(update);

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
      // ~시각 데이터가 존재하지않습니다 팝업뛰우던지 어떨지는 선택으로냅둠
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

  return (
    <>
      <h1>
        {time.hours}:{time.minutes}:{time.seconds}:{time.milliseconds}
      </h1>
      <button onClick={() => setIsPlay((prev) => !prev)}>play</button>
      <TimerButton number={1} handlePlusTimerButton={handlePlusTimerButton} />
      <TimerButton number={5} handlePlusTimerButton={handlePlusTimerButton} />
      <TimerButton number={10} handlePlusTimerButton={handlePlusTimerButton} />
      <TimerButton number={30} handlePlusTimerButton={handlePlusTimerButton} />
      <OrderBook
        index={index}
        orderbook={orderbook}
        total_ask_size={total_ask_size}
        total_bid_size={total_bid_size}
      />
    </>
  );
};

export default Timer;
