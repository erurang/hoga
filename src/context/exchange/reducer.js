import actionType from "./action";

function reducer(state, action) {
  switch (action.type) {
    case actionType.SET_IS_PLAY:
      return action.play;

    case actionType.SELECT_DAY:
      return { ...state, date: action.timestamp };
    case actionType.SET_DATA:
      return {
        ...state,
        loading: false,
        hoga: { ...action.data.hoga },
        trade: { ...action.data.trade },
        ticker: { ...action.data.ticker },
      };

    case actionType.SET_TRADE_INDEX:
      return state + 1;

    case actionType.SET_TICKER_INDEX:
      return state + 1;

    case actionType.SET_ORDERBOOK_INDEX:
      return state + 1;

    case actionType.CLICK_MINUTES_BUTTON:
      return action.num - 1;

    case actionType.TIME_LOOP:
      return action.num - 1;

    case actionType.ERROR_POPUP:
      return { ...state, error: true };

    default:
      throw new Error("잘못된 액션타입");
  }
}

export default reducer;
