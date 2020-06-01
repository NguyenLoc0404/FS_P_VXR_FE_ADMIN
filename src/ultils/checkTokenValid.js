import jwtDecode from "jwt-decode";
const checkTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    //decode la mili second , date.now tinsh bang second
    if (decoded.exp > Date.now() / 1000)
        return {decoded , token}
    else return null;

}

export default checkTokenValid;