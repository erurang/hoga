import { useContext, useReducer } from "react";
import { ExchangeContext } from "../context/exchange";
import reducer from "../context/reducer";

const SelectCoin = () => {
  // coinList 가져와야함..
  const CoinList = ["클레이튼", "한남새고", "스윗한남"];

  //   const [selectedCoin, dispatch] = useReducer(
  //     reducer,
  //     useContext(ExchangeContext)
  //   );

  const { state, dispatch } = useContext(ExchangeContext);

  console.log(state);

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
