import { api } from "../api";
import setHeader from "./../ultils/setHeader"
import jwtDecode from "jwt-decode";
import _ from "lodash";
//credentials {email, password}
export const login = (credentials) => (dispatch) => {
    return api.post("/users/login", credentials)
        .then(res => {
            const { token } = res.data;
            const decoded = jwtDecode(token);
            console.log(decoded);
            //kiểm tra userType
            if (!_.isEmpty(decoded)) {
                console.log("vao decode khac empty")
                if (decoded.userType === "client")
                    return Promise.reject({
                        message: "Bạn Không có quyền truy cập trang chỉ dành cho admin"
                    })
                //lưu vô local storage
                localStorage.setItem("token", token);
                //set header để những lần request API sao mà ko cần đăng nhập
                setHeader(token)
                //set auth reducer
                dispatch(setCurrentUser(decoded))
                // dispatch({
                //     type:"SET_CURRENT_USER",
                //     payload: decoded
                // })
                //return;
            }

        })
        .catch(err => {
            if (!(err.response)) {
                console.log(" vo khac empty log"); 
               return Promise.reject(err) 
            }
            else{
                console.log("vo empty log");
               return Promise.reject(err.response.data) 
            }

        })
}

export const setCurrentUser = (decoded) => {
    return ({
        type: "SET_CURRENT_USER",
        payload: decoded
    })
}
//ko gọi api
//xóa token trong local storage
export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    setHeader();
    dispatch(setCurrentUser({}));
}