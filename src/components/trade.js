import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";

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

const Trade = ({
  ask_bid,
  trade_price,
  trade_timestamp,
  trade_volume,
  timestamp,
  isPlay,
  tradeIndex,
  setTradeIndex,
}) => {
  const [tradeArray, setTradeArray] = useState([]);
  // console.log("컴포넌트 렌더링됨!");
  // console.log("tradeArray :", tradeArray);

  useEffect(() => {
    if (!isPlay) {
      const update = trade_timestamp.findIndex((t) => {
        return t >= timestamp;
      });

      setTradeArray(
        tradeArray.concat([
          [
            trade_price[update].toLocaleString(),
            trade_volume[update].toFixed(3),
            ask_bid[update],
          ],
        ])
      );
      // console.log("1번 실행됨!");
      setTradeIndex(update);
    } else {
      if (tradeArray.length > 9) {
        const newArray = tradeArray;
        newArray.shift();
        // console.log("2번 실행됨!");
        setTradeArray(newArray);
      } else {
        if (timestamp >= trade_timestamp[tradeIndex]) {
          const newArray = tradeArray;
          newArray.push([
            trade_price[tradeIndex].toLocaleString(),
            trade_volume[tradeIndex].toFixed(3),
            ask_bid[tradeIndex],
          ]);
          // console.log("3번 실행됨!");
          setTradeArray(newArray);
          setTradeIndex((prev) => prev + 1);
        }
      }
    }
  }, [timestamp]);

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
            <span style={{ color: "#595959" }}>{n[0]}</span>{" "}
            <span style={{ textAlign: "right" }}>{n[1]}</span>
          </Li>
        ))}
      </Ul>
    </>
  );
};

export default React.memo(Trade);
