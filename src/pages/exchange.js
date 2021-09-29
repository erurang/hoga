import React from "react";
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
    </Container>
  );
};

export default Exchange;
