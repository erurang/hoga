import styled from "styled-components";
import { useContext, useEffect } from "react";
import { BaseContext } from "../context/exchange/exchange";
import Calendar from "./calendar/calendar";
import Chart from "./chart";
import Search from "./search/search";

const ChartContainer = () => {
  const { state } = useContext(BaseContext);

  // useEffect(async () => {
  //   const data = await getDataApi();

  //   if (!data.error) dispatch({ type: actionType.SET_DATA, data });
  //   else if (data.error) dispatch({ tpye: actionType.ERROR_POPUP });
  // }, []);

  // if (state.loading) return <h1>데이터 로딩중...</h1>;
  // else if (state.error) return <h1>데이터를 불러올수 없습니다</h1>;

  // if (state.date && !state.coin)
  return (
    <>
      <Calendar />
      <Search />
      {state.coin && state.date ? <Chart /> : <h1>ㅇㅕ기에 깡통 ui넣기</h1>}
    </>
  );
};

export default ChartContainer;
