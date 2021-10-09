import actionType from "./action";

function reducer(state, action) {
  switch (action.type) {
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

    case actionType.ERROR_POPUP:
      return { ...state, error: true };

    default:
      throw new Error("잘못된 액션타입");
  }
}

export default reducer;
