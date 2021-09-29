import React, { useContext, useState, useEffect } from "react";
import { ExchangeDayContext } from "../context/exchange";

const Timer2 = () => {
  // 날짜 받아옴.

  const date = useContext(ExchangeDayContext);
  const time = new Date(date);

  // 시작하는 시간 time을 받아와서 millisecond로 시간을 올림

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  console.log(seconds);

  return (
    <>
      <div>
        <span>
          {time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:
          {time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}
          :
          {time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}
          :
          {time.getMilliseconds() < 100
            ? time.getMilliseconds() < 10
              ? `00${time.getMilliseconds()}`
              : `0${time.getMilliseconds()}`
            : time.getMilliseconds()}
        </span>
      </div>
    </>
  );
};

export default Timer2;
