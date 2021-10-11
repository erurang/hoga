import ReactCalendar from "react-calendar";
import { useContext, useEffect } from "react";
import { BaseContext } from "../../context/exchange/exchange";
import actionType from "../../context/exchange/action";

const Calendar = () => {
  // usecontext를 사용하는 순간 상태가 변할때 리렌더링됨
  console.log("캘린더 렌더링");

  const { state, dispatch } = useContext(BaseContext);

  const handleOnchange = (event) => {
    // 하루치 timestamp 업데이트
    // console.log(+new Date(event) + 32400000);
    // 0~86400000

    dispatch({
      type: actionType.SELECT_DAY,
      // 임의로 시작시간 정함
      timestamp: +new Date(1633783053586),
      // timestamp: +new Date(event) + 32400000,
    });
  };

  //1633444179421
  //1633444115283
  //1633444158705

  return <ReactCalendar onChange={(e) => handleOnchange(e)} />;
};

export default Calendar;
