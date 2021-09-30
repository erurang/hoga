import React, { useContext, useEffect, useState } from "react";
import { ExchangeContext } from "../context/exchange";

const Timer = () => {
  const { state, dispatch } = useContext(ExchangeContext);
  const time = new Date(state.dayTimestamp);

  const [hours, setHours] = useState(time.getHours());
  const [minutes, setMinutes] = useState(time.getMinutes());
  const [seconds, setSeconds] = useState(time.getSeconds());
  const [milliseconds, setMilliseconds] = useState(time.getMilliseconds());

  useEffect(() => {
    if (state.toggleTimer) {
      const interval = setInterval(() => {
        setMilliseconds((prev) => prev + 1);

        const timerTimestamp = +new Date(
          `${time.getFullYear()}-${
            time.getMonth() + 1
          }-${time.getDate()} ${hours}:${minutes}:${seconds}:${milliseconds}`
        );

        dispatch({ type: "UPDATE_TIMER_TIMESTAMP", timerTimestamp });
      }, 10);

      return () => clearInterval(interval);
    } else {
      console.log("정지");
    }
  }, [
    state.toggleTimer,
    dispatch,
    hours,
    minutes,
    seconds,
    milliseconds,
    time,
  ]);

  useEffect(() => {
    if (milliseconds === 99) {
      // timestamp가 1초에 1000씩 오름
      // 그럼 0.1초에는 100
      // 0.01초에는 10
      setMilliseconds(0);
      setSeconds((prev) => prev + 1);
    }

    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
    }

    if (minutes === 60) {
      setMinutes(0);
      setHours((prev) => prev + 1);
    }
  }, [hours, minutes, seconds, milliseconds]);

  return (
    <>
      <div>
        <span>
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}:
          {milliseconds < 10 ? `0${milliseconds}` : milliseconds}
        </span>
      </div>
      <button onClick={() => dispatch({ type: "TOGGLE_PLAY" })}>Play</button>
    </>
  );
};

export default Timer;
