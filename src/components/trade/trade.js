import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  BaseContext,
  TradeIndexContext,
} from "../../context/exchange/exchange";

const ContainerStyled = styled.div`
  position: absolute;
`;

const LiStyled = styled.li`
  font-size: 11px;
  letter-spacing: 1px;
`;

const UlStyled = styled.ul`
  position: absolute;
  top: 300px;
  left: 10px;
  width: 150px;
  height: 200px;
  overflow: hidden;
`;

const DivStyled = styled.div`
  display: flex;
  justify-content: space-around;
  height: 30px;
`;

const Trade = () => {
  // trade update
  // console.log("trade update");

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

      setTradeArray(newArray);
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
    <ContainerStyled>
      <UlStyled>
        <DivStyled>
          <span>체결가</span>
          <span>체결량</span>
        </DivStyled>
        {tradeArray.map((n, i) => (
          <LiStyled
            key={i}
            style={n[2] === "BID" ? { color: "#d60000" } : { color: "#0051c7" }}
          >
            <span style={{ color: "#595959" }}>{n[0].toLocaleString()}</span>{" "}
            <span style={{ textAlign: "right" }}>{n[1].toFixed(3)}</span>
          </LiStyled>
        ))}
      </UlStyled>
    </ContainerStyled>
  );
};

export default Trade;
