import Day from "react-calendar";
import { SelectDayContext } from "../context/exchange";
import { useContext, useReducer } from "react";
import reducer from "../context/reducer";

const Calendar = () => {
  const [time, dispatch] = useReducer(reducer, useContext(SelectDayContext));

  // console.log(time);

  return (
    <>
      <Day
        onChange={(event) => dispatch({ event, type: "UPDATE_TIMESTAMP" })}
      />
    </>
  );
};

export default Calendar;
