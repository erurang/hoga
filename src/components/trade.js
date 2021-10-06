import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Li = styled.li`
  font-size: 11px;
  letter-spacing: 1px;
`;

const Ul = styled.ul`
  position: absolute;
  bottom: 65px;
  left: 10px;
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
}) => {
  // const [index, setIndex] = useState(0);

  // const [tradeArray, setTradeArray] = useState([]);

  // useEffect(() => {
  //   const update = trade_timestamp.findIndex((t) => {
  //     return t >= timestamp;
  //   });
  //   console.log(index, update);
  //   setIndex(update);

  //   if (tradeArray.length <= 10) {
  //     setTradeArray(
  //       tradeArray.concat([
  //         [
  //           trade_price[update].toLocaleString(),
  //           trade_volume[update].toFixed(3),
  //           ask_bid[update],
  //         ],
  //       ])
  //     );
  //   } else {
  //     tradeArray.shift();
  //     const newArray = tradeArray;
  //     newArray.shift();
  //     setTradeArray(newArray);
  //   }

  //   // setTradeArray([
  //   //   [
  //   //     trade_price[index].toLocaleString(),
  //   //     trade_volume[index].toFixed(3),
  //   //     ask_bid[index],
  //   //   ],
  //   // ]);
  // }, [timestamp]);

  // console.log(index, tradeArray);

  // 우리는 timestamp가 변경될때 최적의 index위치로 찾아가야해.

  // if (tradeArray.length >= 10) {
  //   console.log(tradeArray.length);
  //   const newArray = tradeArray;
  //   newArray.shift();

  //   newArray.push([
  //     trade_price[index].toLocaleString(),
  //     trade_volume[index].toFixed(3),
  //     ask_bid[index],
  //   ]);
  //   setTradeArray(newArray);
  //   setIndex((prev) => prev + 1);
  // } else {
  //   const newArray = tradeArray;
  //   // 여기서 array를 하나하나채우는 방식이된다면 엄청난 무한루프 오류뜸
  //   newArray.push([
  //     trade_price[index].toLocaleString(),
  //     trade_volume[index].toFixed(3),
  //     ask_bid[index],
  //   ]);
  //   setTradeArray(newArray);
  // }

  return (
    <>
      <Ul>
        <Div>
          <span>체결가</span>
          <span>체결량</span>
        </Div>
        {/* {tradeArray.map((n, i) => (
          <Li
            key={i}
            style={n[2] === "BID" ? { color: "#d60000" } : { color: "#0051c7" }}
          >
            <span style={{ color: "#595959" }}>{n[0]}</span>{" "}
            <span style={{ textAlign: "right" }}>{n[1]}</span>
          </Li>
        ))} */}
      </Ul>
    </>
  );
};

export default Trade;
