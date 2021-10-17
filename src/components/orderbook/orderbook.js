import React, { useContext } from "react";
import styled from "styled-components";
import {
  BaseContext,
  OrderBookIndexContext,
  TradeIndexContext,
} from "../../context/exchange/exchange";
import Trade from "../trade/trade";

const ContainerStyled = styled.div`
  width: 490px;
  height: 550px;
  overflow: auto;
  border: 1px solid #f1f1f4;
  text-align: center;
  letter-spacing: 1px;
`;

const PriceContainerStyled = styled.div`
  display: flex;
  height: 45px;
  border-top: 1px solid #f1f1f4;
  position: relative;
`;

const AskPriceStyled = styled.div`
  text-align: right;
  width: 162px;
`;

const BidPriceStyled = styled.div`
  text-align: left;
  width: 125px;
`;

const UpPriceStyled = styled.div`
  font-weight: 700;
  width: 200px;
  position: relative;
  color: ${(props) => (props.pc < props.ap ? "#d60000" : "#0051c7")};
  background-color: "rgba(0,98,223,.03)";
`;

const DownPriceStyled = styled.div`
  font-weight: 700;
  width: 200px;
  position: relative;
  color: ${(props) => (props.cp < props.ap ? "#d60000" : "#0051c7")};
  background-color: "rgba(216,14,53,.04)";
`;

const PriceStyled = styled.div`
  font-weight: 700;
  width: 200px;
  position: relative;
  color: ${(props) => (props.cp < props.ap ? "#d60000" : "#0051c7")};
  /* background-color: "rgba(216,14,53,.04)"; */
`;

const RadiusStyled = styled.div`
  ${(props) =>
    props.index === props.num && props.tp === props.ap
      ? {
          border: "2px solid black",
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          position: "absolute",
        }
      : ""};
`;

const OrderBook = () => {
  const { state } = useContext(BaseContext);
  const { state: orderbookIndex } = useContext(OrderBookIndexContext);
  const { state: tradeIndex } = useContext(TradeIndexContext);
  const {
    hoga: { orderbook, total_ask_size, total_bid_size },
    trade: { prev_closing_price, trade_price },
  } = state;

  return (
    <ContainerStyled>
      {orderbook[orderbookIndex]
        .sort((a, b) => b.ask_price - a.ask_price)
        .map((n, i) => (
          <PriceContainerStyled key={i}>
            <AskPriceStyled>
              <div style={{ height: "15px" }}></div>
              {n.ask_size.toFixed(3)}
            </AskPriceStyled>
            <UpPriceStyled cp={prev_closing_price} ap={n.ask_price}>
              <RadiusStyled
                index={i}
                tp={trade_price[tradeIndex]}
                ap={n.ask_price}
                num={4}
              ></RadiusStyled>
              <div style={{ height: "15px" }}></div>
              {n.ask_price.toLocaleString()}{" "}
              {(
                ((n.ask_price - prev_closing_price) / prev_closing_price) *
                100
              ).toFixed(2)}
              %
            </UpPriceStyled>
          </PriceContainerStyled>
        ))}
      <Trade />
      {orderbook[orderbookIndex]
        .sort((a, b) => a.ask_price - b.ask_price)
        .map((n, i) => (
          <PriceContainerStyled key={i}>
            <AskPriceStyled></AskPriceStyled>
            <DownPriceStyled cp={prev_closing_price} ap={n.ask_price}>
              <RadiusStyled
                index={i}
                tp={trade_price[tradeIndex]}
                ap={n.bid_price}
                num={0}
              ></RadiusStyled>
              <div style={{ height: "15px" }}></div>
              {n.bid_price.toLocaleString()}{" "}
              {(
                ((n.bid_price - prev_closing_price) / prev_closing_price) *
                100
              ).toFixed(2)}
              %
            </DownPriceStyled>
            <BidPriceStyled>
              <div style={{ height: "15px" }}></div>
              {n.bid_size.toFixed(3)}
            </BidPriceStyled>
          </PriceContainerStyled>
        ))}

      <PriceContainerStyled>
        <AskPriceStyled>
          <div style={{ height: "15px" }}></div>
          {total_ask_size[orderbookIndex].toFixed(3)}
        </AskPriceStyled>
        <PriceStyled>
          <div style={{ height: "15px" }}></div>
          수량{" "}
        </PriceStyled>
        <BidPriceStyled>
          <div style={{ height: "15px" }}></div>
          {total_bid_size[orderbookIndex].toFixed(3)}
        </BidPriceStyled>
      </PriceContainerStyled>
    </ContainerStyled>
  );
};

export default OrderBook;
