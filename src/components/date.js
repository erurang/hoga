import Day from "react-calendar";
import { ExchangeContext } from "../context/exchange";
import { useContext, useReducer } from "react";
import reducer from "../context/reducer";

const Calendar = () => {
  // const [time, dispatch] = useReducer(reducer, useContext(ExchangeContext));

  const { state, dispatch } = useContext(ExchangeContext);

  return (
    <>
      <Day
        onChange={(event) => dispatch({ event, type: "UPDATE_TIMESTAMP" })}
      />
      <h1>선택된 날짜 : {state.dayTimestamp}</h1>
    </>
  );
};

export default Calendar;
