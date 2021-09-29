import React, { useContext } from "react";
import { ExchangeContext } from "../context/exchange";

const Timer = ({ index }) => {
  const data = useContext(ExchangeContext);

  const { timestamp } = data;

  const time = new Date(timestamp[index]);

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
      {/* <button onClick={() => togglePlay()}>Play</button> */}
    </>
  );
};

export default Timer;

// 1. 날짜를 선택한다
// 2. 종목을 선택한다
// 3. 데이터를 받아온다.
// 4. 날짜에 맞는 timestamp를 만든다.. ?
// 5. 시간을 돌린다.
// 6. props로 시간상태를 내려준다.
// 7. 시간상태가 같으면 컴포넌트를 업데이트한다.

// 근데 위처럼할경우엔 밀리세컨드마다 컴포넌트가 갱신되는 재수없는경우가 생길텐데..

// 1. 시간은 계속 흘러간다.
// 2. 시간이 흘러갈때 같은 timestamp가 json안에 존재하면 업데이트한다.
// +new Date()
