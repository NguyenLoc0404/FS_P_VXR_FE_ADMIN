import callApi from "../api";

export const getStations = () => (dispatch) => {
    console.log('vao get sation api');
    return callApi("/stations")
        .getItems()
        .then(station => {
            dispatch({
                type: "GET_STATIONS",
                payload: station
            })
        })

}

export const getStation = () => dispatch => {
    return callApi().getItem("").then(station => {
        dispatch({
            type: 'GET_STATION',
            payload: station
        })
    })
}

//redux 
// export const getStations = () => {
//     return {

//     }
// }


export const postStation = (station) => (dispatch) => {
    return callApi("/stations")
        .createItem(station)
        .then(station => {
            dispatch({
                type: "POST_STATION",
                payload: station
            })
            return Promise.resolve(station)
        })
        .catch(err => Promise.reject(err.response.data))
}
//dispatch: làm trên local thôi
export const deleteStation = (id) => (dispatch) => {
    return callApi(`/stations/${id}`)
        .deleteItem()
        .then(() => {
            dispatch({
                type: "DELETE_STATION",
                payload: id
            })
        }).catch(err => Promise.reject(err.response.data))
}


export const putStation = (station) => (dispatch) => {
    // console.log('vap putstation');
    return callApi(`/stations/${station._id}`)
        .updateItem(station)
        .then(() => {
            dispatch({
                type: "UPDATE_STATION",
                payload: station
            })
        })
        .catch(err => Promise.reject(err.response.data))

}

export const createAvatar = (data,stationId) => (dispatch) => {
    // console.log('vap putstation');
    return callApi(`/stations/${stationId}/avatar`)
        .createImage(data)
        .then(() => {
            dispatch({
                type: "CREATE_AVATAR",
                payload: data
            })
        })
        .catch(err => Promise.reject(err))

}