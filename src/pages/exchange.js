import React from "react";
import OrderBook from "../screens/orderbook";
import Timer from "../screens/timer";
import styled from "styled-components";
import Calendar from "../screens/date";

const Container = styled.div`
  background-color: "#E8ECF0";
  width: 100vh;
  height: 100vh;
`;

const Exchange = () => {
  return (
    <Container>
      <Calendar />
      {/* 날짜, 종목명 */}
      <OrderBook />
      {/* 호가박스 */}
    </Container>
  );
};

export default Exchange;
