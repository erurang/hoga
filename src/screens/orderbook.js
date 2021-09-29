import { useContext, useEffect, useReducer } from "react";
import styled from "styled-components";
import {
  ExchangeContext,
  ExchangeIndexContext,
  ExchangePlayContext,
} from "../context/exchange";
import reducer from "../context/reducer";
import Timer from "./timer";

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

const OrderBook = (props) => {
  const data = useContext(ExchangeContext);
  const number = useContext(ExchangeIndexContext);
  const isPlay = useContext(ExchangePlayContext);

  const { orderbook, total_ask_size, total_bid_size } = data;

  const [num, dispatch] = useReducer(reducer, number);
  const [toggle, playDispatch] = useReducer(reducer, isPlay);

  useEffect(() => {
    if (!toggle) return;
    else {
      const interval = setInterval(() => {
        dispatch({ type: "increase" });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [toggle]);

  return (
    <Container>
      <OrderBookTitle>일반호가</OrderBookTitle>
      {orderbook[num]
        .sort((a, b) => b.ask_price - a.ask_price)
        .map((n, i) => (
          <PriceContainer key={i}>
            <AskPrice>{n.ask_size.toFixed(3)}</AskPrice>
            <Price>{n.ask_price.toLocaleString()}</Price>
          </PriceContainer>
        ))}
      {orderbook[num]
        .sort((a, b) => a.ask_price - b.ask_price)
        .map((n, i) => (
          <PriceContainer key={i}>
            <AskPrice></AskPrice>
            <Price>{n.bid_price.toLocaleString()}</Price>
            <BidPrice>{n.bid_size.toFixed(3)}</BidPrice>
          </PriceContainer>
        ))}
      <PriceContainer>
        <AskPrice>{total_ask_size[num].toFixed(3)}</AskPrice>
        <Price>수량 </Price>
        <BidPrice>{total_bid_size[num].toFixed(3)}</BidPrice>
      </PriceContainer>
      <button onClick={() => playDispatch({ type: "isPlay" })}>Play</button>
      <Timer index={num} />
    </Container>
  );
};

export default OrderBook;
