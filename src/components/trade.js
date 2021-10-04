import { useState } from "react";
import styled from "styled-components";

const Trade = ({
  ask_bid,
  trade_price,
  trade_timestamp,
  trade_volume,
  timestamp,
}) => {
  //   console.log(trade_timestamp);
  const [index, setIndex] = useState(0);

  const [tradeArray, setTradeArray] = useState([]);

  if (timestamp >= trade_timestamp[index]) {
    console.log("체결내역 업데이트");

    setIndex((prev) => prev + 1);

    if (tradeArray.length < 10) {
      const newArray = tradeArray;
      newArray.push([
        trade_price[index].toLocaleString(),
        trade_volume[index].toFixed(3),
        ask_bid[index],
      ]);
      setTradeArray(newArray);
    } else {
      const newArray = tradeArray;

      while (true) {
        if (newArray.length >= 19) newArray.shift();
        else break;
      }

      newArray.push([
        trade_price[index].toLocaleString(),
        trade_volume[index].toFixed(3),
        ask_bid[index],
      ]);
      setTradeArray(newArray);
    }
  }

  return (
    <>
      <ul>
        {tradeArray?.reverse().map((n, i) => (
          <li
            key={i}
            style={n[2] === "BID" ? { color: "#d60000" } : { color: "#0051c7" }}
          >
            체결가 : {n[0]} 체결량 :{n[1]}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Trade;
