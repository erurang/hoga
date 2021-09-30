import { useContext } from "react";
import { ExchangeContext } from "../context/exchange";

const SelectCoin = () => {
  const CoinList = ["클레이튼", "한남새고", "스윗한남"];

  const { state, dispatch } = useContext(ExchangeContext);

  return (
    <>
      {CoinList.map((n, i) => (
        <button
          key={i}
          onClick={(event) => {
            const coinName = event.target.innerText;
            dispatch({ coinName, type: "SELECT_COIN" });
          }}
        >
          {n}
        </button>
      ))}
      <h1>선택된 코인 {state.selectCoin}</h1>
    </>
  );
};

export default SelectCoin;
