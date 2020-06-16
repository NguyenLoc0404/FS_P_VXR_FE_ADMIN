import { api } from "../api";
const setHeader = (token) => {
    //console.log("vo set header")
    if (token) 
    api.defaults.headers.common["token"] = token;
    else {
        delete api.defaults.headers.common['token'];
    }
}

export default setHeader;

