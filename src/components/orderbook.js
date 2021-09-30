import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { ExchangeContext } from "../context/exchange";
import Timer from "./timer";
import coin from "../db/sample.json";
// import axios from "axios"

const Container = styled.div`
  width: 490px;
  height: 795px;
  overflow: auto;
  border: 1px solid #f1f1f4;
  text-align: center;
  letter-spacing: 1px;
`;

const PriceContainer = styled.div`
  display: flex;
  height: 45px;
  border-top: 1px solid #f1f1f4;
`;

const AskPrice = styled.div`
  text-align: right;
  width: 162px;
  border-right: 1px solid #f1f1f4;
  padding-top: 15px;
  padding-right: 5px;
`;

const BidPrice = styled.div`
  text-align: left;
  width: 125px;
  border-right: 1px solid #f1f1f4;
  padding-top: 15px;
  padding-left: 5px;
`;

const Price = styled.div`
  font-weight: 700;
  padding-top: 15px;
  width: 162px;
  border-right: 1px solid #f1f1f4;
`;

const OrderBookTitle = styled.span`
  color: "#115DCB";
  font-size: 16px;
`;

const OrderBook = () => {
  const { state, dispatch } = useContext(ExchangeContext);

  const [orderbookList, setOrderbookList] = useState({});

  async function getData() {
    return null;
  }

  useEffect(() => {
    // 날짜나 선택코인이 바뀌었을시에 로딩을위해 데이터삭제
    dispatch({ type: "CLEAR_DATA" });

    // 여기서 timestamp 9시~다음날9시 조정해서 데이터 요청함
    // const timestamp = Object.values(action.data.timestamp);
    // const today = new Date(state.dayTimestamp);
    // const tomorrowDate = +new Date(
    //   `${today.getFullYear()}-${today.getMonth() + 1}-${
    //     today.getDate() + 1
    //   } 09:00:00`
    // );
    //

    // axios
    getData();
    const data = coin; // api 요청해서 가져왓다고 침

    // 가져온 9시~담날9시 데이터 전역데이터로 설정

    if (state.dayTimestamp && state.selectCoin) {
      setTimeout(() => {
        dispatch({ type: "SET_DATA", data });
      }, 1000);
    }
  }, [state.dayTimestamp, state.selectCoin, dispatch]);

  useEffect(() => {
    // 호가체크

    if (
      state?.timerTimestamp &&
      state.timerTimestamp >= state?.data?.timestamp[state.index]
    ) {
      setOrderbookList({
        orderbook: state.data.orderbook[state.index],
        total_ask_size: state.data.total_ask_size[state.index],
        total_bid_size: state.data.total_bid_size[state.index],
      });

      if (state.toggleTimer) {
        console.log("올라감");
        dispatch({ type: "INCREASE_INDEX" });
      }
    }
  }, [state.timerTimestamp]);

  useEffect(() => {
    dispatch({ type: "SET_TIMER_TIMESTAMP", time: state.dayTimestamp });
  }, [state.dayTimestamp, dispatch]);

  return (
    <>
      <OrderBookTitle>일반호가</OrderBookTitle>
      {state.dayTimestamp && state.selectCoin ? (
        state.data ? (
          <>
            <Timer />
            {orderbookList?.orderbook
              ?.sort((a, b) => b.ask_price - a.ask_price)
              .map((n, i) => (
                <PriceContainer key={i}>
                  <AskPrice>{n.ask_size.toFixed(3)}</AskPrice>
                  <Price>{n.ask_price.toLocaleString()}</Price>
                </PriceContainer>
              ))}
            {orderbookList?.orderbook
              ?.sort((a, b) => a.ask_price - b.ask_price)
              .map((n, i) => (
                <PriceContainer key={i}>
                  <AskPrice></AskPrice>
                  <Price>{n.bid_price.toLocaleString()}</Price>
                  <BidPrice>{n.bid_size.toFixed(3)}</BidPrice>
                </PriceContainer>
              ))}
            <PriceContainer>
              <AskPrice>{orderbookList?.total_ask_size?.toFixed(3)}</AskPrice>
              <Price>수량 </Price>
              <BidPrice>{orderbookList?.total_bid_size?.toFixed(3)}</BidPrice>
            </PriceContainer>
          </>
        ) : (
          // 오류일시엔 데이터없다고 추가해야함
          <>
            <h1>훠훠시발</h1>
          </>
        )
      ) : (
        <h1>날짜와 코인을 선택해주세요</h1>
      )}
      <Container></Container>
    </>
  );
};

export default OrderBook;
