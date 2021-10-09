import React, { useContext } from "react";
import styled from "styled-components";
import { BaseContext } from "../context/exchange/exchange";

const Container = styled.div`
  display: flex;
`;

const CoinTitle = ({ index }) => {
  const { state, dispatch } = useContext(BaseContext);

  console.log("타이틀 호가 업데이트");
  console.log(state);

  const {
    coin,
    trade: { prev_closing_price, change, change_price },
  } = state;

  let num = prev_closing_price;

  console.log("===========");
  console.log(num);
  console.log(prev_closing_price);
  console.log("===========");

  if (change[index] === "FALL") {
    num = prev_closing_price - change_price[index];
  } else {
    num = prev_closing_price + change_price[index];
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
        {num}
      </h1>
      <h1>KRW</h1>
      <h1
        style={
          change[index] === "FALL"
            ? { color: "#0051C7" }
            : change[index] === "EVEN"
            ? { color: "black" }
            : { color: "#D60000" }
        }
      >
        {change_price[index]}
      </h1>
    </Container>
  );
};

export default React.memo(CoinTitle);
