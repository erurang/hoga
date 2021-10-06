import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const CoinTitle = ({
  prev_closing_price,
  change,
  change_price,
  coinName,
  index,
}) => {
  let num = prev_closing_price;
  if (change[index] === "FALL") {
    num = prev_closing_price - change_price[index];
  } else {
    num = prev_closing_price + change_price[index];
  }

  // console.log("타이틀 호가 업데이트");

  return (
    <Container>
      <h1>{coinName}</h1>
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
          change[index] === "FALL"
            ? { color: "#0051C7" }
            : change[index] === "EVEN"
            ? { color: "black" }
            : { color: "#D60000" }
        }
      >
        {change_price[index].toLocaleString()}
      </h1>
    </Container>
  );
};

export default React.memo(CoinTitle);
