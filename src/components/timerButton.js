const TimerButton = ({ number, handleTimerButton }) => {
  return <button onClick={(e) => handleTimerButton(e)}>{number}</button>;
};

export default TimerButton;
