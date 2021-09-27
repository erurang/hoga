import React, { useContext } from "react";
import { ExchangeContext } from "../context/exchange";

const Exchange = () => {
  const test = useContext(ExchangeContext);
  console.log(test);
  return <h1>Exchange</h1>;
};

export default Exchange;
