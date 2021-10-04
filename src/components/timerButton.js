const TimerButton = ({ number, handlePlusTimerButton }) => {
  return <button onClick={(e) => handlePlusTimerButton(e)}>{number}</button>;
};

export default TimerButton;
