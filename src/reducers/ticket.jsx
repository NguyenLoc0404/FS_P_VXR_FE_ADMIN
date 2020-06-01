const initialState = [];
const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TICKETS":
          return action.payload;
        case "DELETE_TICKET":
          return state.filter((ticket) => ticket._id !== action.payload);
        case "POST_TICKET":
          return [...state, action.payload];
        case "UPDATE_TICKET":
          const index = state.findIndex((ticket) => ticket._id === action.payload._id);
          state[index] = action.payload;
          return [...state];
        default:
          return state;
      }
};
export default ticketReducer;
