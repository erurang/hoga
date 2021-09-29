import React, { useContext } from "react";
import { ExchangeContext } from "../context/exchange";

const Timer = () => {
  const { state, dispatch } = useContext(ExchangeContext);

  console.log(new Date(state.dayTimestamp));

  return (
    <>
      {/* <div>
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
      </div> */}
      <h1>타이머 ㅇㅇ</h1>
      {/* <button onClick={() => togglePlay()}>Play</button> */}
    </>
  );
};

export default Timer;
