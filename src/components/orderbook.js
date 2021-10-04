import React from "react";
import styled from "styled-components";

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
`;

const BidPrice = styled.div`
  text-align: left;
  width: 125px;
  border-right: 1px solid #f1f1f4;
`;

const Price = styled.div`
  font-weight: 700;
  width: 162px;
  border-right: 1px solid #f1f1f4;
`;

const OrderBookTitle = styled.span`
  color: "#115DCB";
  font-size: 16px;
`;

const OrderBook = ({
  index,
  orderbook,
  total_ask_size,
  total_bid_size,
  prev_closing_price,
  trade_price,
}) => {
  console.log("오더북 업데이트");
  return (
    <Container>
      <h1>{index}</h1>
      {orderbook[index]
        .sort((a, b) => b.ask_price - a.ask_price)
        .map((n, i) => (
          <PriceContainer
            key={i}
            style={{ backgroundColor: "rgba(0,98,223,.03)" }}
          >
            <AskPrice>{n.ask_size.toFixed(3)}</AskPrice>
            <Price
              style={
                prev_closing_price < n.ask_price.toLocaleString()
                  ? { color: "#d60000" }
                  : { color: "#0051c7" }
              }
            >
              <div
                style={
                  i === 4 && trade_price[index] === n.ask_price
                    ? {
                        border: "3px solid black",
                        boxSizing: "border-box",
                        height: "100%",
                      }
                    : {}
                }
              >
                {n.ask_price.toLocaleString()}{" "}
                {(
                  ((n.ask_price - prev_closing_price) / prev_closing_price) *
                  100
                ).toFixed(2)}
                %
              </div>
            </Price>
          </PriceContainer>
        ))}
      {orderbook[index]
        .sort((a, b) => a.ask_price - b.ask_price)
        .map((n, i) => (
          <PriceContainer
            key={i}
            style={{ backgroundColor: "rgba(216,14,53,.04)" }}
          >
            <AskPrice></AskPrice>
            <Price
              style={
                prev_closing_price < n.ask_price
                  ? { color: "#d60000" }
                  : {
                      color: "#0051c7",
                    }
              }
            >
              <div
                style={
                  i === 0 && trade_price[index] === n.bid_price
                    ? {
                        border: "3px solid black",
                        boxSizing: "border-box",
                        height: "100%",
                      }
                    : {}
                }
              >
                {n.bid_price.toLocaleString()}{" "}
                {(
                  ((n.bid_price - prev_closing_price) / prev_closing_price) *
                  100
                ).toFixed(2)}
                %
              </div>
            </Price>
            <BidPrice>{n.bid_size.toFixed(3)}</BidPrice>
          </PriceContainer>
        ))}
      <PriceContainer>
        <AskPrice>{total_ask_size[index].toFixed(3)}</AskPrice>
        <Price>수량 </Price>
        <BidPrice>{total_bid_size[index].toFixed(3)}</BidPrice>
      </PriceContainer>
    </Container>
  );
};

export default React.memo(OrderBook);
