const initialState = [];
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return action.payload;
    case "DELETE_USER":
      return state.filter((user) => user._id !== action.payload);
    case "POST_USER":
      return [...state, action.payload];
    case "PUT_USER":
      const index = state.findIndex((user) => user._id === action.payload._id);
      state[index] = action.payload;
      return [...state];
    default:
      return state;
  }
};
export default userReducer;
