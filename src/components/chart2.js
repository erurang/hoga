import { useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { BaseContext } from "../context/exchange/exchange";
import actionType from "../context/exchange/action";

import Timer from "./timer";
import CoinTitle from "./coinTitle";
import LightChart from "./lightChart";
import Trade from "./trade";
import Orderbook from "./orderbook";

const Container = styled.div`
  position: relative;
  width: 500px;
  border: 1px solid black;
  background-color: #ffffff;
`;

const Chart = () => {
  const { state, dispatch } = useContext(BaseContext);

  // 여기서 타이머를 쓰는게아니라..
  // 전역으로 돌려서 위에서 사용하게끔 만들면..
  // 이 컴포넌트는 타이머가 이동할때 리렌더링될 필요가 없지않나?
  // => 그래도 타이머의 숫자에 따라 표기를해야하는데
  // => 리렌더링을 줄일려면.. 타이머로 아예 상태를 넘겨주자.

  useEffect(async () => {
    // api요청한다치고.. db에서 가져옴
    try {
      // 임의서버임
      // coin 과 date를 같이 날려서 받아오는거로 처리함
      // 일단은 그냥 가져오는걸로
      console.log("데이터 가져오는중...");
      const getData = await axios.get("http://localhost:4000/users/getData");

      const getHoga = getData.data.hoga;
      const orderbook = getHoga.orderbook;
      const coinName = getHoga.coinName;
      const timestamp = getHoga.timestamp;
      const total_ask_size = getHoga.total_ask_size;
      const total_bid_size = getHoga.total_bid_size;

      const getTrade = getData.data.trade;
      const ask_bid = getTrade.ask_bid;
      const change = getTrade.change;
      const change_price = getTrade.change_price;
      const prev_closing_price = getTrade.prev_closing_price;
      const trade_price = getTrade.trade_price;
      const trade_timestamp = getTrade.timestamp;
      const trade_volume = getTrade.trade_volume;

      const getTicker = getData.data.ticker;
      const tic_trade_price = getTicker.trade_price;
      const tic_trade_timestamp = getTicker.timestamp;
      const tic_trade_volume = getTicker.trade_volume;

      const data = {
        hoga: {
          coinName,
          timestamp,
          orderbook,
          total_ask_size,
          total_bid_size,
        },
        trade: {
          ask_bid,
          change,
          change_price,
          prev_closing_price,
          trade_price,
          trade_timestamp,
          trade_volume,
        },
        ticker: {
          tic_trade_price,
          tic_trade_timestamp,
          tic_trade_volume,
        },
        loading: false,
      };

      dispatch({ type: actionType.SET_DATA, data });
    } catch (e) {
      console.log("데이터 가져오기 오류!", e);
      dispatch({ type: actionType.ERROR_POPUP });
    }
  }, []);

  console.log("컴포넌트 마운트됨", state);

  if (state.loading) {
    return <h1>로딩중입니다..</h1>;
  }

  return (
    <Container>
      <CoinTitle />
      <Timer />
      <Trade />
      <Orderbook />
      <LightChart />
    </Container>
  );
};

export default Chart;
