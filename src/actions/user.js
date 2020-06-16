import callApi from "../api";

export const getUsers = () => (dispatch) => {
    return callApi("/users")
        .getItems()
        .then(user => {
            dispatch({
                type: "GET_USERS",
                payload: user
            })
        })

}

export const deleteUser = (id) => (dispatch) => {
    console.log("vao delete user");
    console.log(id);
    return callApi(`/users/${id}`)
        .deleteItem()
        .then(() => {
            dispatch({
                type: "DELETE_USER",
                payload: id
            })
        })
        .catch(err => Promise.reject(err))
}

export const postUser = (user) => (dispatch) => {
    return callApi("/users")
        .createItem(user)
        .then(user => {
            dispatch({
                type: "POST_USER",
                payload: user
            })
        })
        .catch(err => Promise.reject(err.response.data))
}

export const putUser = (user) => (dispatch) => {
    return callApi(`/users/${user._id}`)
        .updateItem(user)
        .then(() => {
            dispatch({
                type: "PUT_USER",
                payload: user
            })
        })
        .catch(err => Promise.reject(err.response.data))
}