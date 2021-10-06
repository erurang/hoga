import React from "react";

const TimerButton = ({ number, handlePlusTimerButton }) => {
  // console.log("타이머버튼 업데이트");
  return <button onClick={(e) => handlePlusTimerButton(e)}>{number}</button>;
};

export default React.memo(TimerButton);
