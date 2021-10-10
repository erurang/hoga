import React, { useContext } from "react";
import styled from "styled-components";
import { BaseContext } from "../context/exchange/exchange";

const Container = styled.div`
  display: flex;
`;

const CoinTitle = ({ tradeIndex }) => {
  const { state, dispatch } = useContext(BaseContext);

  // console.log("타이틀 호가 업데이트");
  // console.log(state);

  const {
    coin,
    trade: { prev_closing_price, change, change_price },
  } = state;

  let num = prev_closing_price;

  if (change[tradeIndex] === "FALL") {
    num = prev_closing_price - change_price[tradeIndex];
  } else {
    num = prev_closing_price + change_price[tradeIndex];
  }

  return (
    <Container>
      <h1>{coin}</h1>
      <h1
        style={
          (num < prev_closing_price
            ? { color: "#0051C7" }
            : { color: "#D60000" },
          { fontSize: "32" })
        }
      >
        {num.toLocaleString()}
      </h1>
      <h1>KRW</h1>
      <h1
        style={
          change[tradeIndex] === "FALL"
            ? { color: "#0051C7" }
            : change[tradeIndex] === "EVEN"
            ? { color: "black" }
            : { color: "#D60000" }
        }
      >
        {change_price[tradeIndex].toLocaleString()}
      </h1>
    </Container>
  );
};

export default React.memo(CoinTitle);
