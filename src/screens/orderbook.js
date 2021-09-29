import { useContext, useEffect, useReducer } from "react";
import styled from "styled-components";
import reducer from "../context/reducer";

const Container = styled.div`
  width: 490px;
  height: 795px;
  overflow: auto;
  border: 1px solid #f1f1f4;
  text-align: center;
  letter-spacing: 1px;
`;

const PriceContainer = styled.div`
  display: flex;
  height: 45px;
  border-top: 1px solid #f1f1f4;
`;

const AskPrice = styled.div`
  text-align: right;
  width: 162px;
  border-right: 1px solid #f1f1f4;
  padding-top: 15px;
  padding-right: 5px;
`;
const BidPrice = styled.div`
  text-align: left;
  width: 125px;
  border-right: 1px solid #f1f1f4;
  padding-top: 15px;
  padding-left: 5px;
`;

const Price = styled.div`
  font-weight: 700;
  padding-top: 15px;
  width: 162px;
  border-right: 1px solid #f1f1f4;
`;

const OrderBookTitle = styled.span`
  color: "#115DCB";
  font-size: 16px;
`;

const OrderBook = (props) => {
  return (
    <Container>
      <OrderBookTitle>일반호가</OrderBookTitle>
    </Container>
  );
};

export default OrderBook;
