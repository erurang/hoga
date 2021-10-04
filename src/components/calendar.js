import ReactCalendar from "react-calendar";
import { useContext, useEffect } from "react";
import { SelectContext } from "../context/exchange/exchange";
import actionType from "../context/exchange/action";

const Calendar = () => {
  // usecontext를 사용하는 순간 같이 리렌더링 시작함..

  const { state, dispatch } = useContext(SelectContext);

  console.log(state);
  const handleOnchange = (event) => {
    // 하루치 timestamp 업데이트
    console.log(+new Date(event) + 32400000);

    dispatch({
      type: actionType.SELECT_DAY,
      timestamp: +new Date(1633363848817),
      // timestamp: +new Date(event) + 32400000,
    });
  };

  console.log("캘린더 리렌더링");
  return <ReactCalendar onChange={(e) => handleOnchange(e)} />;
};

export default Calendar;
