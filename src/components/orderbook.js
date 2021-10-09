import React, { useContext } from "react";
import styled from "styled-components";
import { BaseContext } from "../context/exchange/exchange";

const Container = styled.div`
  width: 490px;
  height: 520px;
  overflow: auto;
  border: 1px solid #f1f1f4;
  text-align: center;
  letter-spacing: 1px;
`;

const PriceContainer = styled.div`
  display: flex;
  height: 45px;
  border-top: 1px solid #f1f1f4;
  position: relative;
`;

const AskPrice = styled.div`
  text-align: right;
  width: 162px;
`;

const BidPrice = styled.div`
  text-align: left;
  width: 125px;
`;

const Price = styled.div`
  font-weight: 700;
  width: 200px;
  position: relative;
`;

const OrderBookTitle = styled.span`
  color: "#115DCB";
  font-size: 16px;
`;

const OrderBook = ({ index }) => {
  console.log("오더북 업데이트");

  const { state, dispatch } = useContext(BaseContext);

  const {
    hoga: { orderbook, total_ask_size, total_bid_size },
    trade: { prev_closing_price, trade_price },
  } = state;

  return (
    <Container>
      <h1>{index}</h1>
      {orderbook[index]
        .sort((a, b) => b.ask_price - a.ask_price)
        .map((n, i) => (
          <PriceContainer key={i}>
            <AskPrice>
              <div style={{ height: "15px" }}></div>
              {n.ask_size.toFixed(3)}
            </AskPrice>
            <Price
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
                  i === 4 && trade_price[index] === n.ask_price
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
            </Price>
          </PriceContainer>
        ))}
      {orderbook[index]
        .sort((a, b) => a.ask_price - b.ask_price)
        .map((n, i) => (
          <PriceContainer key={i}>
            <AskPrice></AskPrice>
            <Price
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
                  i === 0 && trade_price[index] === n.bid_price
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
            </Price>
            <BidPrice>
              <div style={{ height: "15px" }}></div>
              {n.bid_size.toFixed(3)}
            </BidPrice>
          </PriceContainer>
        ))}
      <PriceContainer>
        <AskPrice>
          <div style={{ height: "15px" }}></div>
          {total_ask_size[index].toFixed(3)}
        </AskPrice>
        <Price>
          <div style={{ height: "15px" }}></div>
          수량{" "}
        </Price>
        <BidPrice>
          <div style={{ height: "15px" }}></div>
          {total_bid_size[index].toFixed(3)}
        </BidPrice>
      </PriceContainer>
    </Container>
  );
};

export default React.memo(OrderBook);
