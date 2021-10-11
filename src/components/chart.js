import styled from "styled-components";
import { useContext, useEffect } from "react";
import { BaseContext } from "../context/exchange/exchange";
import actionType from "../context/exchange/action";

import Timer from "./timer/timer";
import CoinTitle from "./coinTitle/coinTitle";
import LightChart from "./lightChart/lightChart";
import Trade from "./trade/trade";
import Orderbook from "./orderbook/orderbook";
import { getDataApi } from "./servies/api";

const ContainerStyled = styled.div`
  position: relative;
`;

const Chart = () => {
  const { state, dispatch } = useContext(BaseContext);

  useEffect(async () => {
    console.log("데이터 가져오는중...");
    // date coin 입력처리
    const data = await getDataApi("date", "coin");

    if (!data.error) dispatch({ type: actionType.SET_DATA, data });
    else dispatch({ type: actionType.ERROR_POPUP });
  }, []);

  console.log("컴포넌트 마운트됨", state);

  if (state.loading) {
    return <h1>로딩중입니다..</h1>;
  }

  return (
    <ContainerStyled>
      <CoinTitle />
      <Timer />
      <LightChart />
      <Trade />
      <Orderbook />
    </ContainerStyled>
  );
};

export default Chart;
