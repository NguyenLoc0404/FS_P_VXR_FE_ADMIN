import { combineReducers} from "redux";
import stations from "./stations";
import layout from "./layout";
import auth from "./auth";
import trips from "./trip";
import users from "./user";
import tickets from "./ticket"
const rootReducer = combineReducers({
    stations,layout,auth,trips,users,tickets
})

export default rootReducer;