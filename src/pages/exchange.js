import React from "react";
import styled from "styled-components";
import SelectCoin from "../components/coin";
import Calendar from "../components/date";

const Container = styled.div`
  background-color: "#E8ECF0";
  width: 100vh;
  height: 100vh;
`;

const Exchange = () => {
  return (
    <Container>
      <Calendar />
      <SelectCoin />
    </Container>
  );
};

export default Exchange;
