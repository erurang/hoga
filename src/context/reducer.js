function reducer(state, action) {
  switch (action.type) {
    case "increase":
      return state + 1;
    case "isPlay":
      return !state;
    default:
      throw new Error("잘못된 액션타입");
  }
}

export default reducer;
