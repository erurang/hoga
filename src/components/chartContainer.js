import styled from "styled-components";
import { useContext, useEffect } from "react";
import { BaseContext } from "../context/exchange/exchange";
import Calendar from "./calendar/calendar";
import Chart from "./chart";
import Search from "./search/search";

const ContainerStyled = styled.div`
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
  border-bottom: 2px solid white;
  height: 85px;
  display: flex;
`;

const ChartContainer = () => {
  const { state } = useContext(BaseContext);

  return (
    <>
      <ContainerStyled>
        <Search />
        <Calendar />
      </ContainerStyled>
      {state.coin && state.date ? <Chart /> : null}
    </>
  );
};

export default ChartContainer;
