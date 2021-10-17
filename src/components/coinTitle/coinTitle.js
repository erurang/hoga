import React, { useContext } from "react";
import styled from "styled-components";
import {
  BaseContext,
  TradeIndexContext,
} from "../../context/exchange/exchange";

const ContainerStyled = styled.div`
  /* display: flex;
  width: 100%;
  height: 130px;
  flex-direction: column;
  background-color: #fff; */
`;

const CoinTitle = () => {
  const { state } = useContext(BaseContext);
  const { state: tradeIndex } = useContext(TradeIndexContext);

  const {
    coin,
    trade: { trade_price, prev_closing_price, change, change_price },
  } = state;

  // if (change[tradeIndex] === "FALL") {
  //   num = prev_closing_price - change_price[tradeIndex];
  // } else {
  //   num = prev_closing_price + change_price[tradeIndex];
  // }

  return (
    <ContainerStyled>
      <div>
        <span>이미지 {coin}</span>
      </div>
      <div
        style={
          (change[tradeIndex] === "FALL"
            ? { color: "#0051C7" }
            : { color: "#D60000" },
          { fontSize: "32px" })
        }
      >
        {trade_price[tradeIndex].toLocaleString()}
        <span style={{ fontSize: "14px" }}>KRW</span>
      </div>
      <h1
        style={
          change[tradeIndex] === "FALL"
            ? { color: "#0051C7" }
            : change[tradeIndex] === "EVEN"
            ? { color: "black" }
            : { color: "#D60000" }
        }
      >
        <span>
          전일대비
          {change_price[tradeIndex].toLocaleString()}
        </span>
      </h1>
    </ContainerStyled>
  );
};

export default CoinTitle;
