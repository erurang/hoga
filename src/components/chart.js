import styled from "styled-components";
import { useContext, useEffect } from "react";
import { BaseContext } from "../context/exchange/exchange";
import actionType from "../context/exchange/action";

import Timer from "./timer/timer";
import CoinTitle from "./coinTitle/coinTitle";
import LightChart from "./lightChart/lightChart";
import Orderbook from "./orderbook/orderbook";
import { getDataApi } from "./servies/api";

const ContainerStyled = styled.div`
  /* position: relative; */
  margin-top: 100px;
  padding-left: 20px;
  /* display: flex; */
`;

const Chart = () => {
  const { state, dispatch } = useContext(BaseContext);

  useEffect(() => {
    console.log("데이터 가져오는중...");
    // date coin 입력처리

    async function getData() {
      try {
        const data = await getDataApi("date", "coin");
        dispatch({ type: actionType.SET_DATA, data });
      } catch {
        dispatch({ type: actionType.ERROR_POPUP });
      }
    }

    getData();
  }, []);

  console.log("컴포넌트 마운트됨", state);

  if (state.loading) {
    return <h1>로딩중입니다..</h1>;
  } else if (state.error) return <h1>에러..</h1>;

  return (
    <ContainerStyled>
      <CoinTitle />
      <Timer />
      <LightChart />
      <Orderbook />
    </ContainerStyled>
  );
};

export default Chart;
