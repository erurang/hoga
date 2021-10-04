import React from "react";

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

  console.log("타이틀 호가 업데이트");

  return (
    <>
      <h1>{coinName}</h1>
      <h1
        style={num < prev_closing_price ? { color: "blue" } : { color: "red" }}
      >
        {num.toLocaleString()} KRW
      </h1>
      <h1
        style={
          change[index] === "FALL"
            ? { color: "blue" }
            : change[index] === "EVEN"
            ? { color: "black" }
            : { color: "red" }
        }
      >
        {change_price[index].toLocaleString()}
      </h1>
    </>
  );
};

export default React.memo(CoinTitle);
