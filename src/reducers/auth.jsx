import _ from "lodash"
const initialState = {
  isAuthenticated: false,
  decode:{} //ứng với payload của token
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
              isAuthenticated: !_.isEmpty(action.payload),
              decode: action.payload
            }
    
    default:
        return state;
}
}
export default authReducer;