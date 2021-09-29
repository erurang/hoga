import { useContext, useReducer } from "react";
import { SelectCoinContext } from "../context/exchange";
import reducer from "../context/reducer";

const SelectCoin = () => {
  // coinList 가져와야함..

  const CoinList = ["클레이튼", "한남새고", "스윗한남"];

  const [selectedCoin, dispatch] = useReducer(
    reducer,
    useContext(SelectCoinContext)
  );

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
      <h1> 선택된 코인 {selectedCoin}</h1>
    </>
  );
};

export default SelectCoin;
