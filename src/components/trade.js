import React, { useState, useEffect, useReducer, useContext } from "react";
import styled from "styled-components";
import { BaseContext, TradeIndexContext } from "../context/exchange/exchange";

const Li = styled.li`
  font-size: 11px;
  letter-spacing: 1px;
`;

const Ul = styled.ul`
  position: absolute;
  top: 300px;
  left: 10px;
  width: 150px;
  height: 200px;
  overflow: hidden;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  height: 30px;
`;

const Trade = () => {
  // trade update
  console.log("trade update");

  const { state } = useContext(BaseContext);
  const { state: tradeIndex } = useContext(TradeIndexContext);

  const {
    trade: { ask_bid, trade_price, trade_volume },
  } = state;

  const [tradeArray, setTradeArray] = useState([
    [trade_price[tradeIndex], trade_volume[tradeIndex], ask_bid[tradeIndex]],
  ]);

  useEffect(() => {
    if (tradeArray.length > 9) {
      const newArray = tradeArray;
      newArray.shift();

      setTradeArray(newArray.reverse());
    } else {
      const newArray = tradeArray;
      newArray.push([
        trade_price[tradeIndex],
        trade_volume[tradeIndex],
        ask_bid[tradeIndex],
      ]);

      setTradeArray(newArray);
    }
  }, [tradeIndex]);

  return (
    <>
      <Ul>
        <Div>
          <span>체결가</span>
          <span>체결량</span>
        </Div>
        {tradeArray.map((n, i) => (
          <Li
            key={i}
            style={n[2] === "BID" ? { color: "#d60000" } : { color: "#0051c7" }}
          >
            <span style={{ color: "#595959" }}>{n[0].toLocaleString()}</span>{" "}
            <span style={{ textAlign: "right" }}>{n[1].toFixed(3)}</span>
          </Li>
        ))}
      </Ul>
    </>
  );
};

export default Trade;
