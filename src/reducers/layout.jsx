const initialState = {
  selectedStation: {},
  selectedTrip: {},
  selectedTicket: {},
  selectedUser: {},
  isDelete: false,
  isUpdate: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_STATION":
      return {
        ...state,
        selectedStation: action.payload,
      };
    case "SET_SELECTED_TRIP":
      return {
        ...state,
        selectedTrip: action.payload,
      };
    case "SET_SELECTED_TICKET":
      return {
        ...state,
        selectedTicket: action.payload,
      };
    case "SET_SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
};
export default layoutReducer;
