function reducer(state, action) {
  // console.log("dispatch :", state, action);
  switch (action.type) {
    case "UPDATE_TIMESTAMP":
      const day = new Date(action.event);
      const year = day.getFullYear();
      const month = day.getMonth() + 1;
      const date = day.getDate();
      return {
        ...state,
        dayTimestamp: +new Date(`${year}-${month}-${date} 09:14:29`),
      };

    case "SET_TIMER_TIMESTAMP":
      return { ...state, timerTimestamp: +action.time };

    case "UPDATE_TIMER_TIMESTAMP":
      return { ...state, timerTimestamp: state.timerTimestamp + 10 };

    case "SELECT_COIN":
      return { ...state, selectCoin: action.coinName };

    case "SET_DATA":
      const timestamp = Object.values(action.data.timestamp);
      const orderbook = Object.values(action.data.orderbook_units);
      const total_ask_size = Object.values(action.data.total_ask_size);
      const total_bid_size = Object.values(action.data.total_bid_size);

      return {
        ...state,
        data: {
          timestamp,
          orderbook,
          total_ask_size,
          total_bid_size,
        },
      };

    case "CLEAR_DATA":
      return { ...state, data: null, toggleTimer: false, index: 0 };

    case "TOGGLE_PLAY":
      console.log("state.index :", state.index);
      return {
        ...state,
        toggleTimer: !state.toggleTimer,
      };

    case "INCREASE_INDEX":
      return {
        ...state,
        range: false,
        index: +state.index + 1,
      };

    case "RANGE_MOVE_INDEX":
      return {
        ...state,
        index: +action.index,
      };

    case "RANGE_UPDATE_TIMER_TIMESTAMP":
      return { ...state, timerTimestamp: action.timerTimestamp };

    default:
      throw new Error("잘못된 액션타입");
  }
}

export default reducer;
