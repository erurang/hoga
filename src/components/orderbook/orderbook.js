import React, { useContext } from "react";
import styled from "styled-components";
import {
  BaseContext,
  OrderBookIndexContext,
  TradeIndexContext,
} from "../../context/exchange/exchange";

const ContainerStyled = styled.div`
  width: 490px;
  height: 520px;
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

const PriceStyled = styled.div`
  font-weight: 700;
  width: 200px;
  position: relative;
`;

const OrderBookTitle = styled.span`
  color: "#115DCB";
  font-size: 16px;
`;

const OrderBook = () => {
  // console.log("오더북 업데이트");

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
            <PriceStyled
              style={
                prev_closing_price < n.ask_price.toLocaleString()
                  ? {
                      color: "#d60000",
                      backgroundColor: "rgba(0,98,223,.03)",
                    }
                  : { color: "#0051c7", backgroundColor: "rgba(0,98,223,.03)" }
              }
            >
              <div
                style={
                  i === 4 && trade_price[tradeIndex] === n.ask_price
                    ? {
                        border: "2px solid black",
                        boxSizing: "border-box",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                      }
                    : {}
                }
              ></div>
              <div style={{ height: "15px" }}></div>
              {n.ask_price.toLocaleString()}{" "}
              {(
                ((n.ask_price - prev_closing_price) / prev_closing_price) *
                100
              ).toFixed(2)}
              %
            </PriceStyled>
          </PriceContainerStyled>
        ))}
      {orderbook[orderbookIndex]
        .sort((a, b) => a.ask_price - b.ask_price)
        .map((n, i) => (
          <PriceContainerStyled key={i}>
            <AskPriceStyled></AskPriceStyled>
            <PriceStyled
              style={
                prev_closing_price < n.ask_price
                  ? { color: "#d60000", backgroundColor: "rgba(216,14,53,.04)" }
                  : {
                      color: "#0051c7",
                      backgroundColor: "rgba(216,14,53,.04)",
                    }
              }
            >
              <div
                style={
                  i === 0 && trade_price[tradeIndex] === n.bid_price
                    ? {
                        border: "2px solid black",
                        boxSizing: "border-box",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                      }
                    : {}
                }
              ></div>
              <div style={{ height: "15px" }}></div>
              {n.bid_price.toLocaleString()}{" "}
              {(
                ((n.bid_price - prev_closing_price) / prev_closing_price) *
                100
              ).toFixed(2)}
              %
            </PriceStyled>
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
