const initialState = [];

//action = {type : Kiểu truyền vào , payload : dữ liệu}
const stationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STATIONS":
      return action.payload;  
    case "POST_STATION":
      //imutable
      //ko thể dùng state.push(action.payload)
      return [...state, action.payload];
    case "DELETE_STATION":
      //action: {type: "delete_station", payload:{_id}}
      return state.filter((st) => st._id !== action.payload);
    case "UPDATE_STATION":
      //action: {type: "delete_station", payload:{_id, name , address, province}}
      const index = state.findIndex(
        (station) => station._id === action.payload._id
      );
      //console.log('index= '+ index);
      state[index] = action.payload;
      //console.log(state[index]);
      return [...state];
    default:
      return state;
  }
};
export default stationReducer;
