import actionType from "./action";

function reducer(state, action) {
  switch (action.type) {
    case actionType.TIMER_TIMESTAMP:
      return { ...state };
    case actionType.SELECT_DAY:
      return { ...state, date: action.timestamp };

    case actionType.ERROR_POPUP:
      return { ...state, error: true };

    default:
      throw new Error("잘못된 액션타입");
  }
}

export default reducer;
