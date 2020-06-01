import { api } from "../api";
import setHeader from "./../ultils/setHeader"
import jwtDecode from "jwt-decode";
//credentials {email, password}
export const login = (credentials) => (dispatch) => {
    return api.post("/users/login", credentials)
        .then(res => {
           // console.log(res.data);
            const { token } = res.data;
            //decoded
            const decoded = jwtDecode(token);
          //  console.log(decoded);
          //  console.log(decoded.userType);

            //kiểm tra userType
            if (decoded.userType === "client")
                return Promise.reject({
                    message: "Bạn Không có quyền truy cập"
                })

            //lưu vô local storage
            localStorage.setItem("token", token);

          
            setHeader(token)
           

            dispatch(setCurrentUser(decoded))

           

            return;
        })
        .catch(err =>Promise.reject(err))
}

export const setCurrentUser =(decoded) => {
    return  ({
        type:"SET_CURRENT_USER",
        payload: decoded
    })
}

export const logout = () => (dispatch) =>{
    localStorage.removeItem("token");
    setHeader();
    dispatch(setCurrentUser({}));
}