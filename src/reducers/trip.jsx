const initialState = [];
const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TRIPS":
      { console.log("vao get trips");
        return action.payload;}
    case "POST_TRIP":
      return [...state, action.payload];
    case "DELETE_TRIP":
      return state.filter((t) => t._id !== action.payload);
    case "UPDATE_TRIP":
     // console.log("vao update");
      const index = state.findIndex((trip) => trip._id === action.payload._id);
      //console.log('index= '+ index);
      state[index] = action.payload;
      //console.log(state[index]);
      return [...state];
    default:
      return state;
  }
};
export default tripReducer;
