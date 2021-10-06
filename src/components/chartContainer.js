import { useContext } from "react";
import styled from "styled-components";
import { SelectContext } from "../context/exchange/exchange";
import Chart from "./chart2";

const ChartContainer = () => {
  const { state, dispatch } = useContext(SelectContext);

  if (state.date && state.coin)
    return <Chart coin={state.coin} date={state.date} />;
  return <h1>날짜와 코인을 선택해주세요</h1>;
};

export default ChartContainer;
