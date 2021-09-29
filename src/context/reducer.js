function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_TIMESTAMP":
      const day = new Date(action.event);
      const year = day.getFullYear();
      const month = day.getMonth();
      const date = day.getDate();
      return +new Date(`${year}-${month}-${date} 09:00:00`);

    case "SELECT_COIN":
      return action.coinName;
    case "increase":
      return state + 1;
    case "isPlay":
      return !state;
    default:
      throw new Error("잘못된 액션타입");
  }
}

export default reducer;
